package archery.game.gameplay_service.entity;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Arrows {

    public static final int TILE_SIZE = Champion.DEFAULT_MOVEMENT_SIZE;
    public final int COLS = 960 / TILE_SIZE;
    public final int ROWS = 640 / TILE_SIZE;
    private final Arrow[][] arrowsBoard = new Arrow[ROWS][COLS];

    private final List<Arrow> topTargetArrows;
    private final List<Arrow> rightTargetArrows;
    private final List<Arrow> downTargetArrows;
    private final List<Arrow> leftTargetArrows;

    public Arrows() {
        this.topTargetArrows = new ArrayList<>();
        this.rightTargetArrows = new ArrayList<>();
        this.downTargetArrows = new ArrayList<>();
        this.leftTargetArrows = new ArrayList<>();
    }

    public Arrow[] getArrowsAsArray() {
        Arrow[] arrows = new Arrow[topTargetArrows.size() + rightTargetArrows.size() + downTargetArrows.size() + leftTargetArrows.size()];
        int i = 0;
        for (Arrow arrow : topTargetArrows) {
            arrows[i++] = arrow;
        }
        for (Arrow arrow : rightTargetArrows) {
            arrows[i++] = arrow;
        }
        for (Arrow arrow : downTargetArrows) {
            arrows[i++] = arrow;
        }
        for (Arrow arrow : leftTargetArrows) {
            arrows[i++] = arrow;
        }
        return arrows;
    }

    public void updateArrows() {
        int step = Champion.DEFAULT_MOVEMENT_SIZE;
        leftTargetArrows.forEach(arrow -> {
            arrow.setX(arrow.getX() - step);
            arrow.setTimeToLive(arrow.getTimeToLive() - 1);
        });
        rightTargetArrows.forEach(arrow -> {
            arrow.setX(arrow.getX() + step);
            arrow.setTimeToLive(arrow.getTimeToLive() - 1);
        });
        topTargetArrows.forEach(arrow -> {
            arrow.setY(arrow.getY() - step);
            arrow.setTimeToLive(arrow.getTimeToLive() - 1);
        });
        downTargetArrows.forEach(arrow -> {
            arrow.setY(arrow.getY() + step);
            arrow.setTimeToLive(arrow.getTimeToLive() - 1);
        });
    }

    public void addArrow(Arrow arrow) {
        switch (arrow.getDirection()) {
            case UP -> topTargetArrows.add(arrow);
            case DOWN -> downTargetArrows.add(arrow);
            case LEFT -> leftTargetArrows.add(arrow);
            case RIGHT -> rightTargetArrows.add(arrow);
        }
    }
}
