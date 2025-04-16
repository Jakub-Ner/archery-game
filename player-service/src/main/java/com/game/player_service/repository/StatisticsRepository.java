package com.game.player_service.repository;

import com.game.player_service.entity.Statistics;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StatisticsRepository extends JpaRepository<Statistics, Integer> {

    List<Statistics> findAllByUserId(Integer userId);
}
