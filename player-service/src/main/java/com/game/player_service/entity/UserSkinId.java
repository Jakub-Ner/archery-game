package com.game.player_service.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UserSkinId implements Serializable {

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "skin_id")
    private Integer skinId;

    public UserSkinId() {
    }

    public UserSkinId(Integer userId, Integer skinId) {
        this.userId = userId;
        this.skinId = skinId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserSkinId that = (UserSkinId) o;
        return userId.equals(that.userId) && skinId.equals(that.skinId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, skinId);
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getSkinId() {
        return skinId;
    }

    public void setSkinId(Integer skinId) {
        this.skinId = skinId;
    }
}