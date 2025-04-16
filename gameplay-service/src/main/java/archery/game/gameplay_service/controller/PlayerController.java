package archery.game.gameplay_service.controller;

import archery.game.gameplay_service.WebSocketConfig;
import archery.game.gameplay_service.dto.PlayerDirectionDto;
import archery.game.gameplay_service.dto.PlayerUpdateDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class PlayerController {
  private static final Logger logger = LoggerFactory.getLogger(PlayerController.class);
  private Integer i = 0;
  private Integer currentPlayerId = 0; // TODO: get from session

  public PlayerController() {
    new Thread(() -> {
        while (matchIsRunning) {
        this.updatePlayerPosition();
      }
    }).start();
    logger.info("PlayerController initialized");
  }


  @MessageMapping("/player/direction")
  public PlayerUpdateDto updateDirection(PlayerDirectionDto req) throws Exception {
    this.i++;
    // process new direction
    logger.info("Received message: {}", req.toString());
  }

  @SendTo("/player/position")
  public PlayerUpdateDto updatePlayerPosition() throws Exception {
    // process new direction and update player position and find all collisions
    logger.info("Received message: {}", req.toString());
    return new PlayerUpdateDto(200, 250, 100);
  }
}
