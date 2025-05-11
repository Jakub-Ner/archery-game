package archery.game.gameplay_service.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Data
@RedisHash
public class Champion {
    // default constants
    public static final int DEFAULT_LEVEL = 1;
    public static final float DEFAULT_EXPERIENCE = 0.0f;
    public static final int DEFAULT_CURRENT_HEALTH = 100;
    public static final int DEFAULT_MAX_HEALTH = 100;
    public static final int DEFAULT_ATTACK_DAMAGE = 10;
    public static final int DEFAULT_ATTACK_SPEED = 1;
    public static final int DEFAULT_ATTACK_RANGE = 100;
    public static final int DEFAULT_MOVEMENT_SPEED = 200; //will be changing
    public static final int DEFAULT_MOVEMENT_SIZE = 50; //stay constant
    public static final int DEFAULT_X = 50;
    public static final int DEFAULT_Y = 50;
    public int imageCoordX;
    public int imageCoordY;
    @Id
    private String sessionId;
    private String championId;
    private String name;
    private String skinPath;
    // dynamic
    private int currentHealth;
    private int maxHealth;
    private int x;
    private int y;
    private int level;
    private float experience;
    private Direction direction;
    private int attackDamage;
    private int attackSpeed;
    private int attackRange;
    private int movementSpeed;
    public Champion(String sessionId, String championId, String name, String skinPath) {
        this.sessionId = sessionId;
        this.championId = championId;
        this.name = name;
        this.skinPath = skinPath;

        level = DEFAULT_LEVEL;
        experience = DEFAULT_EXPERIENCE;
        currentHealth = DEFAULT_CURRENT_HEALTH;
        maxHealth = DEFAULT_MAX_HEALTH;

        attackDamage = DEFAULT_ATTACK_DAMAGE;
        attackSpeed = DEFAULT_ATTACK_SPEED;
        attackRange = DEFAULT_ATTACK_RANGE;

        movementSpeed = DEFAULT_MOVEMENT_SPEED;

        x = DEFAULT_X;
        y = DEFAULT_Y;
        direction = Direction.NONE;
    }

}
