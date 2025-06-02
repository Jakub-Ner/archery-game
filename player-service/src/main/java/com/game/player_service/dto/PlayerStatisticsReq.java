package com.game.player_service.dto;

public class PlayerStatisticsReq {
	private int kills;
	private int deaths;
	private int playTimeSeconds;

	public int getKills() {
		return kills;
	}

	public void setKills(int kills) {
		this.kills = kills;
	}

	public int getDeaths() {
		return deaths;
	}

	public void setDeaths(int deaths) {
		this.deaths = deaths;
	}

	public int getPlayTimeSeconds() {
		return playTimeSeconds;
	}

	public void setPlayTimeSeconds(int playTimeSeconds) {
		this.playTimeSeconds = playTimeSeconds;
	}

	@Override
	public String toString() {

		return "PlayerStatisticsReq{" +
				"kills=" + kills +
				", deaths=" + deaths +
				", playTimeSeconds=" + playTimeSeconds +
				'}';
	}
}

