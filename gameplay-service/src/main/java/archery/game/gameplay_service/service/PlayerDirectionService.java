package archery.game.gameplay_service.service;

import archery.game.gameplay_service.entity.Direction;
import archery.game.gameplay_service.entity.Champion;
import org.springframework.stereotype.Service;

@Service
public class PlayerDirectionService {
	private final ChampionRedisService championRedisService;

	public PlayerDirectionService(ChampionRedisService championRedisService) {
		this.championRedisService = championRedisService;
	}

	public void updateDirection(Champion champion, Direction direction) {
		System.out.println("Direction changed to " + direction);
		champion.setDirection(direction);
		championRedisService.update(champion);
	}
	public void updatePosition(Champion champion) {
		int step = champion.getMovementSize();
		switch (champion.getDirection()) {
			case LEFT -> champion.setX(champion.getX() - step);
			case RIGHT -> champion.setX(champion.getX() + step);
			case UP -> champion.setY(champion.getY() - step);
			case DOWN -> champion.setY(champion.getY() + step);
		}
		championRedisService.updateLocation(champion.getId(), champion.getX(), champion.getY());
	}
}