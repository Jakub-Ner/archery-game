package archery.game.gameplay_service.controller;

import archery.game.gameplay_service.dto.*;
import archery.game.gameplay_service.entity.Champion;
import archery.game.gameplay_service.service.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Component
@Controller
public class PlayerController {

    private static final Logger logger = LoggerFactory.getLogger(PlayerController.class);

    private final PlayerPositionService playerPositionService;

    private final ChampionRedisService championRedisService;

    private final ArrowService arrowService;

    private final StatisticsService statisticsService;

    private final Map<String, Long> playerStartTimes = new ConcurrentHashMap<>();

    private final Map<String, Integer> playerDeaths = new ConcurrentHashMap<>();

    private final Map<String, Integer> playerKills = new ConcurrentHashMap<>();

    private final Map<String, String> playersSessionIdToChampionId = new ConcurrentHashMap<>();


    // TODO move cron to a service
    private final SimpMessagingTemplate messagingTemplate;

    private int timeCounter = 0;

    public PlayerController(
            PlayerPositionService playerPositionService,
            ChampionRedisService championRedisService, ArrowService arrowService, StatisticsService statisticsService,
            SimpMessagingTemplate messagingTemplate
    ) {

        this.playerPositionService = playerPositionService;
        this.championRedisService = championRedisService;
        this.arrowService = arrowService;
        this.statisticsService = statisticsService;
        this.messagingTemplate = messagingTemplate;
        logger.info("PlayerController initialized");
    }


    @SendToUser("/topic/player/position")
    @Scheduled(initialDelay = 1000, fixedRate = 50) // milliseconds
    public void broadcastPlayerUpdate() {

        timeCounter++;
        timeCounter %= 1000;
        var champions = (List<Champion>) this.championRedisService.findAll();

        if (!champions.isEmpty()) {
            champions.removeIf(champion -> "-1".equals(champion.getChampionId()));
        }


        this.arrowService.updateArrows();
        for (Champion champion : champions) {
            champion.addExperience(Champion.CONST_EXPERIENCE_GAIN); //null pointer
            if (timeCounter % (1000 / champion.getMovementSpeed()) == 0) {
                playerPositionService.updatePosition(champion);
                champion.updateTimeToNextAttack();
            }
        }
        this.arrowService.collidedArrows(champions, playerDeaths, playerKills);

        this.championRedisService.saveAll(champions);
        var dto = new GameUpdateRes(champions, this.arrowService.getArrowsAsArray());
        messagingTemplate.convertAndSend("/topic/player/position", dto);
    }

    @MessageMapping("/player/direction")
    public void updateDirection(@Header("simpSessionId") String sessionId, PlayerDirectionReq req) {

        Champion player = championRedisService.findById(sessionId);
        if (player == null) return;
        playerPositionService.updateDirection(player, req.newDirection);
        logger.info("Current player {} direction: {}", player.getChampionId(), req.newDirection);

    }

    @MessageMapping("/player/shoot")
    public void shoot(@Header("simpSessionId") String sessionId) {

        arrowService.shoot(sessionId);
    }

    @MessageMapping("/player/position/initialize")
    public void initializePlayerPosition(@Header("simpSessionId") String sessionId, PlayerInitReq playerReq) throws Exception {

        logger.info("Initializing player position for id: {} {}", sessionId, playerReq);
        Champion player = new Champion(sessionId, playerReq.getChampionId(), playerReq.getName(), playerReq.getSkinPath());
        this.championRedisService.update(player);
        playerStartTimes.put(sessionId, System.currentTimeMillis());
        playerDeaths.put(sessionId, 0);
        playerKills.put(sessionId, 0);
        playersSessionIdToChampionId.put(sessionId, player.getChampionId());
    }

    @EventListener
    public void handleSessionDisconnect(SessionDisconnectEvent event) {

        String sessionId = Objects.requireNonNull(event.getSessionId());
        Long startTime = playerStartTimes.remove(sessionId);
        Integer deaths = playerDeaths.remove(sessionId);
        Integer kills = playerKills.remove(sessionId);
        String championId = playersSessionIdToChampionId.remove(sessionId);

        if (startTime != null) {
            int durationMillis = (int) (System.currentTimeMillis() - startTime);
            int seconds = durationMillis / 1000;

            PlayerStatisticsReq playerStatisticsReq = new PlayerStatisticsReq(
                    kills != null ? kills : 0,
                    deaths != null ? deaths : 0,
                    seconds
            );

            logger.info("Player {} kills: {}. deaths: {}", championId, kills, deaths);
            logger.info("Player {} disconnected. Total play time: {} seconds", sessionId, seconds);

            statisticsService.sendStatistics(championId, playerStatisticsReq);
        } else {
            logger.info("Player {} disconnected, but no start time was recorded.", sessionId);
        }
    }
}