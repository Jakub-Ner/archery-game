package archery.game.gameplay_service.repository;

import archery.game.gameplay_service.entity.Champion;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChampionRedisRepository extends CrudRepository<Champion, String> {
}
