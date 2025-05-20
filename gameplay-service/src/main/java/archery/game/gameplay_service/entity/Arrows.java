package archery.game.gameplay_service.entity;

import archery.game.gameplay_service.service.ObstacleService;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Arrows {

    public static final int TILE_SIZE = Champion.DEFAULT_MOVEMENT_SIZE;
    public final int COLS = 960 / TILE_SIZE;
    public final int ROWS = 640 / TILE_SIZE;
    private final Arrow[][] arrowsBoard = new Arrow[ROWS][COLS];

    private final List<Arrow> upTargetArrows;
    private final List<Arrow> rightTargetArrows;
    private final List<Arrow> downTargetArrows;
    private final List<Arrow> leftTargetArrows;

    public Arrows() {
        this.upTargetArrows = new ArrayList<>();
        this.rightTargetArrows = new ArrayList<>();
        this.downTargetArrows = new ArrayList<>();
        this.leftTargetArrows = new ArrayList<>();
    }

    public Arrow[] getArrowsAsArray() {
        Arrow[] arrows = new Arrow[upTargetArrows.size() + rightTargetArrows.size() + downTargetArrows.size() + leftTargetArrows.size()];
        int i = 0;
        for (Arrow arrow : upTargetArrows) {
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

    public void updateArrows(ObstacleService obstacleService) {
        int step = Champion.DEFAULT_MOVEMENT_SIZE;
        upTargetArrows.forEach(arrow -> {
            if (!obstacleService.isObstacle(arrow.getX(), arrow.getY())) {
                arrowsBoard[arrow.getY() / TILE_SIZE][arrow.getX() / TILE_SIZE] = null;
                arrow.setY(arrow.getY() - step);
                arrowsBoard[arrow.getY() / TILE_SIZE][arrow.getX() / TILE_SIZE] = arrow;
                arrow.setTimeToLive(arrow.getTimeToLive() - 1);
            } else {
                arrow.setTimeToLive(-1);
            }
        });
        rightTargetArrows.forEach(arrow -> {
            if (!obstacleService.isObstacle(arrow.getX(), arrow.getY())) {
                arrowsBoard[arrow.getY() / TILE_SIZE][arrow.getX() / TILE_SIZE] = null;
                arrow.setX(arrow.getX() + step);
                arrowsBoard[arrow.getY() / TILE_SIZE][arrow.getX() / TILE_SIZE] = arrow;
                arrow.setTimeToLive(arrow.getTimeToLive() - 1);
            } else {
                arrow.setTimeToLive(-1);
            }
        });
        downTargetArrows.forEach(arrow -> {
            if (!obstacleService.isObstacle(arrow.getX(), arrow.getY())) {
                arrowsBoard[arrow.getY() / TILE_SIZE][arrow.getX() / TILE_SIZE] = null;
                arrow.setY(arrow.getY() + step);
                arrowsBoard[arrow.getY() / TILE_SIZE][arrow.getX() / TILE_SIZE] = arrow;
                arrow.setTimeToLive(arrow.getTimeToLive() - 1);
            } else {
                arrow.setTimeToLive(-1);
            }
        });
        leftTargetArrows.forEach(arrow -> {
            if (!obstacleService.isObstacle(arrow.getX(), arrow.getY())) {
                arrowsBoard[arrow.getY() / TILE_SIZE][arrow.getX() / TILE_SIZE] = null;
                arrow.setX(arrow.getX() - step);
                arrowsBoard[arrow.getY() / TILE_SIZE][arrow.getX() / TILE_SIZE] = arrow;
                arrow.setTimeToLive(arrow.getTimeToLive() - 1);
            } else {
                arrow.setTimeToLive(-1);
            }
        });
        upTargetArrows.removeIf(arrow -> arrow.getTimeToLive() <= 0);
        rightTargetArrows.removeIf(arrow -> arrow.getTimeToLive() <= 0);
        downTargetArrows.removeIf(arrow -> arrow.getTimeToLive() <= 0);
        leftTargetArrows.removeIf(arrow -> arrow.getTimeToLive() <= 0);
    }

    public void addArrow(Arrow arrow) {
        int step = Champion.DEFAULT_MOVEMENT_SIZE;
        switch (arrow.getDirection()) {
            case UP -> {
                arrow.setY(arrow.getY() - step);
                upTargetArrows.add(arrow);
            }
            case RIGHT -> {
                arrow.setX(arrow.getX() + step);
                rightTargetArrows.add(arrow);
            }
            case DOWN ->{
                arrow.setY(arrow.getY() + step);
                downTargetArrows.add(arrow);
            }
            case LEFT ->{
                arrow.setX(arrow.getX() - step);
                leftTargetArrows.add(arrow);
            }
        }
    }

    public Arrow getArrowOrNull(int x, int y) {
        int col = x / TILE_SIZE;
        int row = y / TILE_SIZE;
        if (row < 0 || row >= ROWS || col < 0 || col >= COLS) {
            return null;
        }
        return arrowsBoard[row][col];
    }

    public void removeArrow(Arrow arrow) {
        arrowsBoard[arrow.getY() / TILE_SIZE][arrow.getX() / TILE_SIZE] = null;
        switch (arrow.getDirection()) {
            case UP -> upTargetArrows.remove(arrow);
            case DOWN -> downTargetArrows.remove(arrow);
            case LEFT -> leftTargetArrows.remove(arrow);
            case RIGHT -> rightTargetArrows.remove(arrow);
        }
    }
}
