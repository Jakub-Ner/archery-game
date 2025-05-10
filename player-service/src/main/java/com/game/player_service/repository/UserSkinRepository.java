package com.game.player_service.repository;

import com.game.player_service.entity.UserSkin;
import com.game.player_service.entity.UserSkinId;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserSkinRepository extends JpaRepository<UserSkin, UserSkinId> {

    List<UserSkin> findByUserId(Integer userId);
}
