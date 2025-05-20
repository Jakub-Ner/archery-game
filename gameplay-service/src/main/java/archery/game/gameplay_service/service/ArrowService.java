package archery.game.gameplay_service.service;

import archery.game.gameplay_service.entity.Arrow;
import archery.game.gameplay_service.entity.Arrows;
import archery.game.gameplay_service.entity.Champion;
import org.slf4j.Logger;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ArrowService {
    private final ChampionRedisService championRedisService;
    private final ObstacleService obstacleService;
    private final Logger logger = org.slf4j.LoggerFactory.getLogger(ArrowService.class);
    private final Arrows arrows;

    public ArrowService(ChampionRedisService championRedisService, ObstacleService obstacleService) {
        this.championRedisService = championRedisService;
        this.obstacleService = obstacleService;
        arrows = new Arrows();
    }


    public void updateArrows() {
        arrows.updateArrows(obstacleService);
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

    public void collidedArrows(List<Champion> champions) {
        for (Champion champion: champions){
            Arrow arrow = arrows.getArrowOrNull(champion.getX(), champion.getY());
            if (arrow != null) {
                champion.setCurrentHealth(champion.getCurrentHealth() - arrow.getDamage());
                if (champion.getCurrentHealth() <= 0) {
                    champion.init();
                }
                arrows.removeArrow(arrow);
            }
        }
    }
}
