package archery.game.gameplay_service.dto;

import archery.game.gameplay_service.entity.Direction;
import lombok.Data;

@Data
public class PlayerDirectionReq {
    public Direction newDirection;

}
