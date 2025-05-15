package archery.game.gameplay_service.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Data
@RedisHash
public class Champion {
    // default constants
    public static final int DEFAULT_LVL = 1;
    public static final int DEFAULT_EXPERIENCE = 0;
    public static final int CONST_EXPERIENCE_GAIN = 1;

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

    private int lvl;
    private int currentExperience;
    private int experienceForNextLvl;


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

        lvl = DEFAULT_LVL;
        currentExperience = DEFAULT_EXPERIENCE;
        experienceForNextLvl = getExperienceForNextLvl(lvl);

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

    private int getExperienceForNextLvl(int currentlvl) {
        return (int) (100 * Math.pow(1.2, currentlvl));
    }

    public void addExperience(int additionalExperience) {
        currentExperience += additionalExperience;
        if (currentExperience < experienceForNextLvl) return;
        lvl++;
        currentExperience = currentExperience - experienceForNextLvl;
        experienceForNextLvl = getExperienceForNextLvl(lvl);
        this.upgradeChampionStats();
    }

    private void upgradeChampionStats() {
//            maxHealth += 10;
//            attackDamage += 5;
//            attackSpeed += 1;
//            attackRange += 1;
//            movementSpeed += 5;
    }
}
