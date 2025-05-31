package archery.game.gameplay_service.service;

import archery.game.gameplay_service.dto.PlayerStatisticsReq;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class StatisticsService {

	private static final Logger logger = LoggerFactory.getLogger(StatisticsService.class);

	public void sendStatistics(String championId, PlayerStatisticsReq playerStatisticsReq) {

		RestTemplate restTemplate = new RestTemplate();

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		HttpEntity<PlayerStatisticsReq> request = new HttpEntity<>(playerStatisticsReq, headers);

		try {

			restTemplate.postForEntity(
					"http://localhost:8080/statistics/" + championId,
					request,
					Void.class
			);

			logger.info("Statistics sent to backend for player {}", championId);
		} catch (Exception e) {
			logger.error("Failed to send statistics for player {}: {}", championId, e.getMessage());
		}
	}
}
