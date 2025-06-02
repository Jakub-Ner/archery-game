package archery.game.gameplay_service.service;

import archery.game.gameplay_service.entity.Arrow;
import archery.game.gameplay_service.entity.Arrows;
import archery.game.gameplay_service.entity.Champion;
import org.slf4j.Logger;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


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

    public void collidedArrows(List<Champion> champions, Map<String, Integer> playerDeaths, Map<String, Integer> playerKills) {
        for (Champion champion: champions){
            Arrow arrow = arrows.getArrowOrNull(champion.getX(), champion.getY());
            if (arrow != null) {
                champion.setCurrentHealth(champion.getCurrentHealth() - arrow.getDamage());
                if (champion.getCurrentHealth() <= 0) {
                    logger.info("Player {} killed {}", championRedisService.findById(arrow.getSessionId()).getChampionId(), champion.getChampionId());

                    champion.init();

                    playerDeaths.merge(champion.getSessionId(), 1, Integer::sum);
                    playerKills.merge(arrow.getSessionId(), 1, Integer::sum);
                }
                arrows.removeArrow(arrow);
            }
        }
    }
}
