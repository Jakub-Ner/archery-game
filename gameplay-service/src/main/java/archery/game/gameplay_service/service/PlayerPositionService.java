package archery.game.gameplay_service.service;

import archery.game.gameplay_service.entity.Champion;
import archery.game.gameplay_service.entity.Direction;
import org.springframework.stereotype.Service;

@Service
public class PlayerPositionService {
    private final ChampionRedisService championRedisService;

    public PlayerPositionService(ChampionRedisService championRedisService) {
        this.championRedisService = championRedisService;
    }

    public void updateDirection(Champion champion, Direction direction) {
        System.out.println("Direction changed to " + direction);
        champion.setDirection(direction);
        championRedisService.update(champion);
    }

    public void updatePosition(Champion champion) {
        int step = Champion.DEFAULT_MOVEMENT_SIZE;
        champion.imageCoordX = (champion.imageCoordX + 1) % 4;
        switch (champion.getDirection()) {
            case LEFT -> {
                champion.setX(champion.getX() - step);
                champion.imageCoordY = 1;
            }
            case RIGHT -> {
                champion.setX(champion.getX() + step);
                champion.imageCoordY = 2;
            }
            case UP -> {
                champion.setY(champion.getY() - step);
                champion.imageCoordY = 3;
            }
            case DOWN -> {
                champion.setY(champion.getY() + step);
                champion.imageCoordY = 0;
            }
        }
    }

    public Champion findById(String id) {
        return championRedisService.findById(id);
    }
}