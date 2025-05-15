package archery.game.gameplay_service;

import archery.game.gameplay_service.repository.ChampionRedisRepository;
import archery.game.gameplay_service.service.ChampionRedisService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.session.Session;

@Configuration
public class WebSocketHandlersConfig<S extends Session> {
    @Bean
    public WebSocketConnectHandler<S> webSocketConnectHandler(
            ChampionRedisService redisService) {
        return new WebSocketConnectHandler<>(redisService);
    }

    @Bean
    public WebSocketDisconnectHandler<S> webSocketDisconnectHandler(
            ChampionRedisRepository repository) {
        return new WebSocketDisconnectHandler<>(repository);
    }
}
