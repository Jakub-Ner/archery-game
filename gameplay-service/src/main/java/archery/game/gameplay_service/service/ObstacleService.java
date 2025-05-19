package archery.game.gameplay_service.service;

import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
@Service
public class ObstacleService {
    public static final int TILE_SIZE = 32;
    public final int COLS = 960 / TILE_SIZE;
    public final int ROWS = 640 / TILE_SIZE;
    private final boolean[][] obstaclesMap = new boolean[ROWS][COLS];

    public ObstacleService() {
        loadObstacles("src/main/resources/static/obstacles.txt");
    }

    public boolean isObstacle(int x, int y) {
        int col = x / TILE_SIZE;
        int row = y / TILE_SIZE;
        if (row < 0 || row >= ROWS || col < 0 || col >= COLS) {
            return true;
        }
        return obstaclesMap[row][col];
    }

    private void loadObstacles(String path) {
        try(BufferedReader reader = new BufferedReader(new FileReader(path))){
            String line;
            int row = 0;
            while ((line = reader.readLine()) != null) {
                String[] values = line.split(",");
                for (int col = 0; col < values.length; col++) {
                    obstaclesMap[row][col] = Integer.parseInt(values[col]) != 0;
                }
                row++;
            }
        } catch (FileNotFoundException e) {
            throw new RuntimeException("\n\n\nCould not find the file: src/main/resources/obstacles.txt");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
