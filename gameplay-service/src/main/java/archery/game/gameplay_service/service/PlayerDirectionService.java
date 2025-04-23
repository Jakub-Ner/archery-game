package archery.game.gameplay_service.service;

import archery.game.gameplay_service.dto.PlayerDirectionDto.Direction;
import archery.game.gameplay_service.entity.Champion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlayerDirectionService {

	ChampionRedisService championRedisService;

	private final int MOVEMENT_STEP = 5;

	@Autowired
	public PlayerDirectionService(ChampionRedisService championRedisService) {

		this.championRedisService = championRedisService;
	}

	public void updateDirection(Champion champion, Direction direction) {

		int x = champion.getX();
		int y = champion.getY();

		switch (direction) {
			case LEFT -> x = x - MOVEMENT_STEP;
			case RIGHT -> x = x + MOVEMENT_STEP;
			case UP -> y = y + MOVEMENT_STEP;
			case DOWN -> y = y - MOVEMENT_STEP;
			case NONE -> x = x + MOVEMENT_STEP;
			default -> x = x + MOVEMENT_STEP;
		}
		championRedisService.updateLocation(champion.getId(), x, y);

		champion.setX(x);
		champion.setY(y);
	}
}