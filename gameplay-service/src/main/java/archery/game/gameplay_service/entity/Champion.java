package archery.game.gameplay_service.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Data
@RedisHash
public class Champion {
    @Id
    private String id;
    private String name;
    private String icon;

    public Champion(String id, String name, String icon) {
        this.id = id;
        this.name = name;
        this.icon = icon;

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

    // dynamic
    private int level;
    private float experience;
    private int currentHealth;
    private int maxHealth;

    private int attackDamage;
    private int attackSpeed;
    private int attackRange;

    private int movementSpeed;

    private int x;
    private int y;
    private Direction direction;

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

    public static final int DEFAULT_X = 0;
    public static final int DEFAULT_Y = 0;

}
