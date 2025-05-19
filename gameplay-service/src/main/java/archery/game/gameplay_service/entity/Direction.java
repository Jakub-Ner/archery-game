package archery.game.gameplay_service.entity;


public enum Direction {
    NONE("NONE"),
    UP("UP"),
    DOWN("DOWN"),
    LEFT("LEFT"),
    RIGHT("RIGHT");

    public final String value;

    Direction(String value) {
        this.value = value;
    }
}