package archery.game.gameplay_service.dto;

import lombok.Data;

@Data
public class PlayerInitReq {
    String championId;
    String name;
    String skinPath;
}
