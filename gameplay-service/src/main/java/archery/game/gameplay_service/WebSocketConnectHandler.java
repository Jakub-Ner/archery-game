package archery.game.gameplay_service;

import archery.game.gameplay_service.service.ChampionRedisService;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.socket.messaging.SessionConnectEvent;

public class WebSocketConnectHandler<S> implements ApplicationListener<SessionConnectEvent> {
    private final ChampionRedisService championRedisService;

    public WebSocketConnectHandler(
            ChampionRedisService championRedisService) {
        super();
        this.championRedisService = championRedisService;
    }

    @Override
    public void onApplicationEvent(SessionConnectEvent event) {
        MessageHeaders headers = event.getMessage().getHeaders();
        String id = SimpMessageHeaderAccessor.getSessionId(headers);
        this.championRedisService.createUninitialized(id);
    }

}
