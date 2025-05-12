package archery.game.gameplay_service.service;

import archery.game.gameplay_service.entity.Champion;
import archery.game.gameplay_service.repository.ChampionRedisRepository;
import org.springframework.stereotype.Service;

@Service
public class ChampionRedisService {
    public final ChampionRedisRepository championRedisRepository;
    final String REDIS_PREFIX = "archery.game.gameplay_service.entity.Champion:";

    public ChampionRedisService(
            ChampionRedisRepository championRedisRepository
    ) {
        this.championRedisRepository = championRedisRepository;
        this.deleteAll();
    }

    public void saveAll(Iterable<Champion> champions) {
        championRedisRepository.saveAll(champions);
    }

    public void deleteAll() {
        championRedisRepository.deleteAll();
    }

    public void update(Champion champion) {
        championRedisRepository.save(champion);
    }

    public Iterable<Champion> findAll() {
        return championRedisRepository.findAll();
    }

    public Champion findById(String sessionId) {
        return championRedisRepository.findById(sessionId).orElse(null);
    }

    public void createUninitialized(String sessionId) {
        Champion champion = new Champion(sessionId, "-1", "not-set", "not-set");
        championRedisRepository.save(champion);
    }
}
