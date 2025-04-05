package com.game.player_service.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "user_skins")
public class UserSkin {

    @EmbeddedId
    private UserSkinId id;

    @Column(name = "is_selected")
    private boolean isSelected;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonBackReference
    private User user;

    @ManyToOne
    @JoinColumn(name = "skin_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonBackReference
    private Skin skin;

    public UserSkinId getId() {
        return id;
    }

    public void setId(UserSkinId id) {
        this.id = id;
    }

    public boolean isSelected() {
        return isSelected;
    }

    public void setSelected(boolean selected) {
        isSelected = selected;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Skin getSkin() {
        return skin;
    }

    public void setSkin(Skin skin) {
        this.skin = skin;
    }
}
