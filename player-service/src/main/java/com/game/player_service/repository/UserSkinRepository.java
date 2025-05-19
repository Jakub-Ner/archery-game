package com.game.player_service.repository;

import com.game.player_service.entity.UserSkin;
import com.game.player_service.entity.UserSkinId;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserSkinRepository extends JpaRepository<UserSkin, UserSkinId> {

    List<UserSkin> findByUserId(Integer userId);
    Optional<UserSkin> findByIdUserIdAndIsSelectedTrue(Integer userId);
    Optional<UserSkin> findByIdUserIdAndIdSkinId(Integer userId, Integer skinId);

}
