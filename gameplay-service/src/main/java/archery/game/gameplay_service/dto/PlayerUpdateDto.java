package archery.game.gameplay_service.dto;

public class PlayerUpdateDto {
    public int x;
    public int y;
    public int hp;

    public PlayerUpdateDto(int x, int y, int hp) {
        this.x = x;
        this.y = y;
        this.hp = hp;
    }

    public String toString() {
        return "PlayerUpdateDto{" +
                "x=" + x +
                ", y=" + y +
                ", hp=" + hp +
                '}';
    }
}
