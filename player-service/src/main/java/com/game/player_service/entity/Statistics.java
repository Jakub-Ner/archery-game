package com.game.player_service.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "statistics")
public class Statistics {

    @Id
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "games_played")
    private int gamesPlayed;

    @Column(name = "best_score")
    private int bestScore;

    @Column(name = "average_score")
    private float averageScore;

    @Column(name = "kills_per_death")
    private float killsPerDeath;

    @Column(name = "total_time_played")
    private int totalTimePlayed;

    @Column(name = "account_created_at")
    private LocalDateTime accountCreatedAt;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public int getGamesPlayed() {
        return gamesPlayed;
    }

    public void setGamesPlayed(int gamesPlayed) {
        this.gamesPlayed = gamesPlayed;
    }

    public int getBestScore() {
        return bestScore;
    }

    public void setBestScore(int bestScore) {
        this.bestScore = bestScore;
    }

    public float getAverageScore() {
        return averageScore;
    }

    public void setAverageScore(float averageScore) {
        this.averageScore = averageScore;
    }

    public float getKillsPerDeath() {
        return killsPerDeath;
    }

    public void setKillsPerDeath(float killsPerDeath) {
        this.killsPerDeath = killsPerDeath;
    }

    public int getTotalTimePlayed() {
        return totalTimePlayed;
    }

    public void setTotalTimePlayed(int totalTimePlayed) {
        this.totalTimePlayed = totalTimePlayed;
    }

    public LocalDateTime getAccountCreatedAt() {
        return accountCreatedAt;
    }

    public void setAccountCreatedAt(LocalDateTime accountCreatedAt) {
        this.accountCreatedAt = accountCreatedAt;
    }
}
