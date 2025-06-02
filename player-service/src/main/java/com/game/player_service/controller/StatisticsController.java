package com.game.player_service.controller;

import com.game.player_service.dto.PlayerStatisticsReq;
import com.game.player_service.entity.Statistics;
import com.game.player_service.service.StatisticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/statistics")
public class StatisticsController {

	private final StatisticsService statisticsService;

	public StatisticsController(StatisticsService statisticsService) {

		this.statisticsService = statisticsService;
	}

	@GetMapping("/{userId}")
	public Statistics getUserStatistics(@PathVariable Integer userId) {

		return statisticsService.getUserStatistics(userId);
	}

	@PostMapping("/{userId}")
	public ResponseEntity<Void> updateUserStatistics(
			@PathVariable Integer userId,
			@RequestBody PlayerStatisticsReq stats
	) {

		System.out.println(stats);
		statisticsService.updateUserStatistics(userId, stats);
		return ResponseEntity.ok().build();
	}


}
