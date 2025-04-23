package archery.game.gameplay_service.controller;

import archery.game.gameplay_service.entity.Champion;
import archery.game.gameplay_service.dto.PlayerUpdateDto;
import archery.game.gameplay_service.dto.PlayerDirectionDto;
import archery.game.gameplay_service.service.PlayerDirectionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.WebSocketSession;

import java.util.concurrent.CopyOnWriteArraySet;

@Component
@Controller
public class PlayerController {
	//	TODO: Use sessions to send messages to specific players or maybe send all data to all players
	private final CopyOnWriteArraySet<WebSocketSession> sessions = new CopyOnWriteArraySet<>();
	private static final Logger logger = LoggerFactory.getLogger(PlayerController.class);
	private final PlayerDirectionService playerDirectionService;

	// TODO: Use Redis to store player data instead of in-memory here
	private final Champion champion;

	// TODO move cron to a service
	private final SimpMessagingTemplate messagingTemplate;

	@Autowired
	public PlayerController(PlayerDirectionService playerDirectionService, SimpMessagingTemplate messagingTemplate) {
		this.playerDirectionService = playerDirectionService;
		this.messagingTemplate = messagingTemplate;
        this.champion = new Champion("0","agata","icon");
		logger.info("PlayerController initialized");
	}


	@Scheduled(fixedRate = 200) // milliseconds
	public void broadcastPlayerUpdate() {
		System.out.println("Broadcasting player update. Before " + champion);
		playerDirectionService.updatePosition(champion);
		PlayerUpdateDto dto = new PlayerUpdateDto(champion.getX(), champion.getY(), champion.getCurrentHealth());
		messagingTemplate.convertAndSend("/topic/player/position", dto);
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
		// TODO: Use playerId to get the player from postgres
		return new PlayerUpdateDto(champion.getX(), champion.getY(), champion.getCurrentHealth());
	}
}
