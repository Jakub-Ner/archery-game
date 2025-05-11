package archery.game.gameplay_service;

import archery.game.gameplay_service.repository.ChampionRedisRepository;
import org.springframework.context.ApplicationListener;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

public class WebSocketDisconnectHandler<S> implements ApplicationListener<SessionDisconnectEvent> {
    private final ChampionRedisRepository repository;

    public WebSocketDisconnectHandler(
            ChampionRedisRepository repository) {
        super();
        this.repository = repository;
    }

    @Override
    public void onApplicationEvent(SessionDisconnectEvent event) {
        String id = event.getSessionId();
        if (id == null) {
            return;
        }
        this.repository.findById(id).ifPresent((champion) -> {
            this.repository.deleteById(id);
        });
    }

}
