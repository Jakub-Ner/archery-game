package archery.game.gameplay_service.entity;

import lombok.Data;

@Data
public class Arrow {
    private final String sessionId;
    private final int damage;
    private final Direction direction;
    public final int imageCoordX;
    public int imageCoordY;
    private int timeToLive;
    private int x;
    private int y;

    public Arrow(String sessionId, int damage, Direction direction, int range, int x, int y) {
        this.sessionId = sessionId;
        this.damage = damage;
        this.direction = direction;
        this.timeToLive = range;
        this.x = x;
        this.y = y;
        this.imageCoordX = 0;
        switch (direction) {
            case LEFT -> this.imageCoordY = 1;
            case RIGHT -> this.imageCoordY = 3;
            case UP -> this.imageCoordY = 2;
            case DOWN -> this.imageCoordY = 0;
        }
    }
}
