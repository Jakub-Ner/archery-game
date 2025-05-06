package com.game.player_service.service;

import com.game.player_service.entity.Statistics;
import com.game.player_service.repository.StatisticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class StatisticsService {

    private final StatisticsRepository statisticsRepository;

    @Autowired
    public StatisticsService(StatisticsRepository statisticsRepository) {
        this.statisticsRepository = statisticsRepository;
    }

    public Statistics getUserStatistics(Integer userId) {
		Optional<Statistics> statistics = statisticsRepository.findById(userId);
		if (statistics.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Statistics not found");
		}
		return statistics.get();
    }    
}
