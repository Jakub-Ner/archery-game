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
    public static final int BASE_ATTACK_DELAY = 50; // N frames
    public static final int DEFAULT_ATTACK_SPEED = 10; // user can shoot one time every 10 frames
    public static final int DEFAULT_ATTACK_RANGE = 100;

    public static final int DEFAULT_MOVEMENT_SPEED = 200; //will be changing
    public static final int DEFAULT_MOVEMENT_SIZE = 32; //stay constant
    public static final int DEFAULT_X = DEFAULT_MOVEMENT_SIZE;
    public static final int DEFAULT_Y = DEFAULT_MOVEMENT_SIZE;

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
    private int movementSpeed;
    private int attackDamage;
    private int attackSpeed;
    private int timeToNextAttack;
    private int attackRange;

    public void init() {
        lvl = DEFAULT_LVL;
        currentExperience = DEFAULT_EXPERIENCE;
        experienceForNextLvl = getExperienceForNextLvl(lvl);

        currentHealth = DEFAULT_CURRENT_HEALTH;
        maxHealth = DEFAULT_MAX_HEALTH;

        attackDamage = DEFAULT_ATTACK_DAMAGE;
        attackSpeed = DEFAULT_ATTACK_SPEED;
        timeToNextAttack = 0;
        attackRange = DEFAULT_ATTACK_RANGE;

        movementSpeed = DEFAULT_MOVEMENT_SPEED;

        x = DEFAULT_X;
        y = DEFAULT_Y;
        direction = Direction.NONE;
    }

    public Champion(String sessionId, String championId, String name, String skinPath) {
        this.sessionId = sessionId;
        this.championId = championId;
        this.name = name;
        this.skinPath = skinPath;

        init();
    }

    public void updateTimeToNextAttack() {
        if (timeToNextAttack > 0) {
            timeToNextAttack -= attackSpeed;
        }
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
        maxHealth += 10;
        currentHealth += 10;
        attackDamage += 5;
        attackSpeed += 5;
        attackRange += 1;
        movementSpeed += 5;
    }
}
