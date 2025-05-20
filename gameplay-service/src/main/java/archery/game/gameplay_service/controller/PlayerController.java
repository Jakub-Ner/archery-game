package archery.game.gameplay_service.controller;

import archery.game.gameplay_service.dto.GameUpdateRes;
import archery.game.gameplay_service.dto.PlayerDirectionReq;
import archery.game.gameplay_service.dto.PlayerInitReq;
import archery.game.gameplay_service.entity.Champion;
import archery.game.gameplay_service.service.ArrowService;
import archery.game.gameplay_service.service.ChampionRedisService;
import archery.game.gameplay_service.service.PlayerPositionService;
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
import java.util.Objects;

@Component
@Controller
public class PlayerController {
    private static final Logger logger = LoggerFactory.getLogger(PlayerController.class);
    private final PlayerPositionService playerPositionService;
    private final ChampionRedisService championRedisService;
    private final ArrowService arrowService;

    // TODO move cron to a service
    private final SimpMessagingTemplate messagingTemplate;

    private int timeCounter = 0;

    public PlayerController(
            PlayerPositionService playerPositionService,
            ChampionRedisService championRedisService, ArrowService arrowService,
            SimpMessagingTemplate messagingTemplate
    ) {
        this.playerPositionService = playerPositionService;
        this.championRedisService = championRedisService;
        this.arrowService = arrowService;
        this.messagingTemplate = messagingTemplate;
        logger.info("PlayerController initialized");
    }


    @SendToUser("/topic/player/position")
    @Scheduled(initialDelay = 1000, fixedRate = 50) // milliseconds
    public void broadcastPlayerUpdate() {
        timeCounter++;
        timeCounter %= 1000;
        var champions = (List<Champion>)this.championRedisService.findAll();
        champions.removeIf(Objects::isNull);

        this.arrowService.updateArrows();
        for (Champion champion : champions) {
            champion.addExperience(Champion.CONST_EXPERIENCE_GAIN);
            if (timeCounter % (1000 / champion.getMovementSpeed()) == 0) {
                playerPositionService.updatePosition(champion);
                champion.updateTimeToNextAttack();
            }
        }
        this.arrowService.collidedArrows(champions);

        this.championRedisService.saveAll(champions);
        var dto = new GameUpdateRes(champions, this.arrowService.getArrowsAsArray());
        messagingTemplate.convertAndSend("/topic/player/position", dto);
    }

    @MessageMapping("/player/direction")
    public void updateDirection(@Header("simpSessionId") String sessionId, PlayerDirectionReq req) {
        Champion player = championRedisService.findById(sessionId);
        if (player == null) return;
        playerPositionService.updateDirection(player, req.newDirection);
        logger.info("Current player direction: {}", req.newDirection);
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
    }
}
