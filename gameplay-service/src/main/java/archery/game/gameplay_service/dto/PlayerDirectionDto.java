package archery.game.gameplay_service.dto;

public class PlayerDirectionDto {
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

    public Direction newDirection;

    public String toString() {
        return "PlayerDirectionDto{" +
                "newDirection=" + newDirection +
                '}';

    }
}
