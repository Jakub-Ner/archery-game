package archery.game.gameplay_service.service;

import archery.game.gameplay_service.entity.Champion;
import archery.game.gameplay_service.entity.Direction;
import org.springframework.stereotype.Service;

@Service
public class PlayerPositionService {
    private final ChampionRedisService championRedisService;
    private final ObstacleService obstacleService;

    public PlayerPositionService(ChampionRedisService championRedisService, ObstacleService obstacleService) {
        this.championRedisService = championRedisService;
        this.obstacleService = obstacleService;
    }

    public void updateDirection(Champion champion, Direction direction) {
        System.out.println("Direction changed to " + direction);
        champion.setDirection(direction);
        switch (direction) {
            case LEFT -> champion.imageCoordY = 1;
            case RIGHT -> champion.imageCoordY = 2;
            case UP -> champion.imageCoordY = 3;
            case DOWN -> champion.imageCoordY = 0;
        }
        championRedisService.update(champion);
    }

    public boolean updatePosition(Champion champion) {
        int step = Champion.DEFAULT_MOVEMENT_SIZE;
        champion.imageCoordX = (champion.imageCoordX + 1) % 4;
        int newX = champion.getX();
        int newY = champion.getY();
        switch (champion.getDirection()) {
            case LEFT -> newX -= step;
            case RIGHT -> newX += step;
            case UP -> newY -= step;
            case DOWN -> newY += step;
        }

        if (obstacleService.isObstacle(newX, newY)) {
            return false;
        }
        champion.setX(newX);
        champion.setY(newY);
        return true;
    }

    public Champion findById(String id) {
        return championRedisService.findById(id);
    }
}