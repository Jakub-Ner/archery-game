package com.game.player_service.controller;

import com.game.player_service.entity.Statistics;
import com.game.player_service.service.StatisticsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


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
}
