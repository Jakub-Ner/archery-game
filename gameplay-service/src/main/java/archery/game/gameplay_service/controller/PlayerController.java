package archery.game.gameplay_service.controller;

import archery.game.gameplay_service.dto.PlayerDirectionDto;
import archery.game.gameplay_service.dto.PlayerUpdateDto;
import archery.game.gameplay_service.entity.Champion;
import archery.game.gameplay_service.service.PlayerDirectionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class PlayerController {

	private static final Logger logger = LoggerFactory.getLogger(PlayerController.class);

	PlayerDirectionService playerDirectionService;

	private Integer i = 0;

	private Champion champion;

	private boolean matchIsRunning = true;

	@Autowired
	public PlayerController(PlayerDirectionService playerDirectionService) {

		this.champion = new Champion("0","agata","icon");
		this.playerDirectionService = playerDirectionService;
		logger.info("PlayerController initialized");

//		new Thread(() -> {
//			while (matchIsRunning) {
//				try {
//					this.updatePlayerPosition();
//				} catch (Exception e) {
//					throw new RuntimeException(e);
//				}
//			}
//		}).start();
	}


	@MessageMapping("/player/direction")
	public void updateDirection(PlayerDirectionDto req) throws Exception {

		logger.info("Direction changed");
		this.i++;

		// process new direction
		playerDirectionService.updateDirection(champion, req.newDirection);
		logger.info("Current player direction: {}", req.newDirection);
	}

	@SendTo("/player/position")
	public PlayerUpdateDto updatePlayerPosition() throws Exception {
		// process new direction and update player position and find all collisions
		return new PlayerUpdateDto(champion.getX(), champion.getY(), champion.getCurrentHealth());
	}
}
