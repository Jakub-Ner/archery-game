package com.game.player_service.service;

import com.game.player_service.entity.Statistics;
import com.game.player_service.repository.StatisticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatisticsService {

    private final StatisticsRepository statisticsRepository;

    @Autowired
    public StatisticsService(StatisticsRepository statisticsRepository) {
        this.statisticsRepository = statisticsRepository;
    }

    public List<Statistics> getUserStatistics(Integer userId) {
        return statisticsRepository.findAllByUserId(userId);
    }
}
