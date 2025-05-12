package archery.game.gameplay_service.controller;

import archery.game.gameplay_service.dto.GameUpdateRes;
import archery.game.gameplay_service.dto.PlayerDirectionReq;
import archery.game.gameplay_service.dto.PlayerInitReq;
import archery.game.gameplay_service.entity.Champion;
import archery.game.gameplay_service.service.ChampionRedisService;
import archery.game.gameplay_service.service.PlayerDirectionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

import java.util.List;

@Component
@Controller
public class PlayerController {
    private static final Logger logger = LoggerFactory.getLogger(PlayerController.class);
    private final PlayerDirectionService playerDirectionService;
    private final ChampionRedisService championRedisService;

    // TODO move cron to a service
    private final SimpMessagingTemplate messagingTemplate;

    private int timeCounter = 0;

    public PlayerController(
            PlayerDirectionService playerDirectionService,
            ChampionRedisService championRedisService,
            SimpMessagingTemplate messagingTemplate
    ) {
        this.playerDirectionService = playerDirectionService;
        this.championRedisService = championRedisService;
        this.messagingTemplate = messagingTemplate;
        logger.info("PlayerController initialized");
    }


    @SendToUser("/topic/player/position")
    @Scheduled(initialDelay = 1000, fixedRate = 50) // milliseconds
    public void broadcastPlayerUpdate() {
        timeCounter++;
        timeCounter %= 1000;
        var champions = this.championRedisService.findAll();

        for (Champion champion : champions) {
            if (timeCounter % (1000 / champion.getMovementSpeed()) == 0) {
                playerDirectionService.updatePosition(champion);
            }
        }
        this.championRedisService.saveAll(champions);
        var dto = new GameUpdateRes((List<Champion>) champions);
        messagingTemplate.convertAndSend("/topic/player/position", dto);
    }

    @MessageMapping("/player/direction")
    public void updateDirection(@Header("simpSessionId") String sessionId, PlayerDirectionReq req) {
        Champion player = championRedisService.findById(sessionId);
        playerDirectionService.updateDirection(player, req.newDirection);
        logger.info("Current player direction: {}", req.newDirection);
    }

    @MessageMapping("/player/position/initialize")
    public void initializePlayerPosition(@Header("simpSessionId") String sessionId, PlayerInitReq playerReq) throws Exception {
        logger.info("Initializing player position for id: {} {}", sessionId, playerReq);
        Champion player = new Champion(sessionId, playerReq.getChampionId(), playerReq.getName(), playerReq.getSkinPath());
        this.championRedisService.update(player);
    }
}
