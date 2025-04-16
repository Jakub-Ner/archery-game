package archery.game.gameplay_service.service;

import archery.game.gameplay_service.entity.Champion;
import archery.game.gameplay_service.repository.ChampionRedisRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ChampionRedisService {
    private final RedisTemplate<String, String> redisTemplate;
    public final ChampionRedisRepository championRedisRepository;

    public ChampionRedisService(
            ChampionRedisRepository championRedisRepository,
            RedisTemplate<String, String> redisTemplate
    ) {
        this.championRedisRepository = championRedisRepository;
        this.redisTemplate = redisTemplate;
    }

    @PostConstruct
    public void createDummy() {
        System.out.println("Creating dummy champion");
        String id = "id1234";
        var c = create(id, "DummyPlayer", "dummy.png");

        c = findById(id);
        System.out.println("Fetched from redis: " + c);

        updateLocation(id, 100, 200);
        var cords = redisTemplate.opsForHash().multiGet(REDIS_PREFIX + id, List.of("x", "y"));
        System.out.println("Fetched from redis: " + cords);
    }

    final String REDIS_PREFIX = "archery.game.gameplay_service.entity.Champion:";

    public void updateLocation(String id, int x, int y) {
        Map<String, String> cords = Map.of("x", String.valueOf(x), "y", String.valueOf(y));
        redisTemplate.opsForHash().putAll(REDIS_PREFIX + id, cords);
    }

    public void deleteAll() {
        championRedisRepository.deleteAll();
    }

    public Champion create(String id, String name, String icon) {
        Champion champion = new Champion(id, name, icon);
        championRedisRepository.save(champion);
        return champion;
    }

    public void update(Champion champion) {
        championRedisRepository.save(champion);
    }


    public Iterable<Champion> findAll() {
        return championRedisRepository.findAll();
    }

    public Champion findById(String id) {
        return championRedisRepository.findById(id).orElse(null);
    }
}
