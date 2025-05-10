package archery.game.gameplay_service.controller;

import archery.game.gameplay_service.entity.Champion;
import archery.game.gameplay_service.dto.PlayerUpdateDto;
import archery.game.gameplay_service.dto.PlayerDirectionDto;
import archery.game.gameplay_service.service.PlayerDirectionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;


@Component
@Controller
public class PlayerController {
	private static final Logger logger = LoggerFactory.getLogger(PlayerController.class);
	private final PlayerDirectionService playerDirectionService;

	// TODO: Use Redis to store player data instead of in-memory here
	private final Champion champion;

	// TODO move cron to a service
	private final SimpMessagingTemplate messagingTemplate;

	private int timeCounter = 0;


	public PlayerController(PlayerDirectionService playerDirectionService, SimpMessagingTemplate messagingTemplate) {
		this.playerDirectionService = playerDirectionService;
		this.messagingTemplate = messagingTemplate;
        this.champion = new Champion("0","agana","icon");
		logger.info("PlayerController initialized");
	}


	@Scheduled(fixedRate = 50) // milliseconds
	public void broadcastPlayerUpdate() {

		timeCounter++;
		timeCounter %= 1000;

		if (timeCounter % (1000 / champion.getMovementSpeed()) == 0){

			System.out.println("Broadcasting player update. Before " + champion);
			playerDirectionService.updatePosition(champion);
			PlayerUpdateDto dto = new PlayerUpdateDto(champion.getX(), champion.getY(), champion.getCurrentHealth());
			messagingTemplate.convertAndSend("/topic/player/position", dto);
		}
	}

	@MessageMapping("/player/direction")
	public void updateDirection(PlayerDirectionDto req) throws Exception {
		playerDirectionService.updateDirection(champion, req.newDirection);
		logger.info("Current player direction: {}", req.newDirection);
	}

	// TODO: User should send their id to the server, and should get initial position and statistics
	@MessageMapping("/player/position/initialize")
	@SendTo("/topic/player/position")
	public PlayerUpdateDto initializePlayerPosition(String playerId){
		//TODO polacz z 2 serwisem(do logowania) i pobierz dane gracza
		// TODO: Use playerId to get the player from postgres
		Champion player = this.playerDirectionService.findById(playerId);
		return new PlayerUpdateDto(player.getX(), player.getY(), player.getCurrentHealth());
	}
}
