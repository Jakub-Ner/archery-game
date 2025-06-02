package archery.game.gameplay_service.dto;

import lombok.Data;

@Data
public class PlayerStatisticsReq {

	private int kills;
	private int deaths;
	private int playTimeSeconds;

	public PlayerStatisticsReq(int kills, int deaths, int playTimeSeconds) {

		this.kills = kills;
		this.deaths = deaths;
		this.playTimeSeconds = playTimeSeconds;
	}
}