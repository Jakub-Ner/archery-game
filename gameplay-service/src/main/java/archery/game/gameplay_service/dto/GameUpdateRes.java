package archery.game.gameplay_service.dto;

import archery.game.gameplay_service.entity.Arrow;
import archery.game.gameplay_service.entity.Champion;
import archery.game.gameplay_service.entity.Direction;
import lombok.Data;

import java.util.List;

@Data
public class GameUpdateRes {
    PlayerUpdate[] players;
    Arrow[] arrows;

    public GameUpdateRes(List<Champion> champions, Arrow[] arrows) {
        this.arrows = arrows;
        this.players = champions.stream()
                .map(champion -> new PlayerUpdate(
                        champion.getChampionId(),
                        champion.getName(),
                        champion.getSkinPath(),
                        champion.getCurrentHealth(),
                        champion.getMaxHealth(),
                        champion.getX(),
                        champion.getY(),
                        champion.getImageCoordX(),
                        champion.getImageCoordY(),
                        champion.getLvl(),
                        champion.getCurrentExperience(),
                        champion.getDirection()
                )).toArray(PlayerUpdate[]::new);
    }

    @Data
    public class Hp {
        public int current;
        public int full;

        public Hp(int current, int full) {
            this.current = current;
            this.full = full;
        }
    }

    @Data
    public class Coords {
        public int x;
        public int y;

        public Coords(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }

    @Data
    public class PlayerUpdate {
        public String championId;
        public String name;
        public String skinPath;
        public Hp hp;
        public Coords coords;
        public Coords imageCoords;
        public int lvl;
        public float experience;
        public Direction currentDirection;

        public PlayerUpdate(String championId, String name, String skinPath,
                            int currentHp, int fullHp,
                            int x, int y,
                            int imageX, int imageY,
                            int lvl, float experience,
                            Direction currentDirection) {
            this.championId = championId;
            this.name = name;
            this.skinPath = skinPath;
            this.hp = new Hp(currentHp, fullHp);
            this.coords = new Coords(x, y);
            this.imageCoords = new Coords(imageX, imageY);
            this.lvl = lvl;
            this.experience = experience;
            this.currentDirection = currentDirection;
        }
    }

}
