package com.game.player_service.service;

import com.game.player_service.dto.PlayerStatisticsReq;
import com.game.player_service.entity.Statistics;
import com.game.player_service.repository.StatisticsRepository;
import jakarta.persistence.Column;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class StatisticsService {

    private final StatisticsRepository statisticsRepository;

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

	public void updateUserStatistics(Integer userId, PlayerStatisticsReq stats) {
		Statistics currentStats = getUserStatistics(userId);
		float totalKills = currentStats.getTotalKills() + stats.getKills();
		float totalDeaths = currentStats.getTotalDeaths() + stats.getDeaths();
		int totalGamesPlayed = currentStats.getGamesPlayed() + 1;

		currentStats.setGamesPlayed(totalGamesPlayed);
		currentStats.setBestScore(Math.max(currentStats.getBestScore(), stats.getKills()));
		currentStats.setAverageScore(totalKills/totalGamesPlayed);
		currentStats.setTotalDeaths(totalDeaths);
		currentStats.setTotalKills(totalKills);
		currentStats.setKillsPerDeath(totalKills/totalDeaths);
		currentStats.setTotalTimePlayed(currentStats.getTotalTimePlayed() + stats.getPlayTimeSeconds());

		statisticsRepository.save(currentStats);
	}

}
