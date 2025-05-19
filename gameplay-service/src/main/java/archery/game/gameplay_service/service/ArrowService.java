package archery.game.gameplay_service.service;

import archery.game.gameplay_service.entity.Arrow;
import archery.game.gameplay_service.entity.Arrows;
import archery.game.gameplay_service.entity.Champion;
import org.springframework.stereotype.Service;

@Service
public class ArrowService {
    private final ChampionRedisService championRedisService;
    private final ObstacleService obstacleService;

    private final Arrows arrows;

    public ArrowService(ChampionRedisService championRedisService, ObstacleService obstacleService) {
        this.championRedisService = championRedisService;
        this.obstacleService = obstacleService;
        arrows = new Arrows();
    }


    public void UpdateArrows() {
        arrows.updateArrows();
        arrows.getTopTargetArrows().removeIf(arrow -> obstacleService.isObstacle(arrow.getX(), arrow.getY()));
        arrows.getRightTargetArrows().removeIf(arrow -> obstacleService.isObstacle(arrow.getX(), arrow.getY()));
        arrows.getDownTargetArrows().removeIf(arrow -> obstacleService.isObstacle(arrow.getX(), arrow.getY()));
        arrows.getLeftTargetArrows().removeIf(arrow -> obstacleService.isObstacle(arrow.getX(), arrow.getY()));
    }

    public void shoot(String sessionId) {
        Champion player = championRedisService.findById(sessionId);
        if (player == null) return;
        if (player.getTimeToNextAttack() > 0) return;
        Arrow arrow = new Arrow(sessionId, player.getAttackDamage(), player.getDirection(), player.getAttackRange(), player.getX(), player.getY());
        arrows.addArrow(arrow);
        player.setTimeToNextAttack(Champion.BASE_ATTACK_DELAY);
        championRedisService.update(player);
    }

    public Arrow[] getArrowsAsArray() {
        return arrows.getArrowsAsArray();
    }
}
