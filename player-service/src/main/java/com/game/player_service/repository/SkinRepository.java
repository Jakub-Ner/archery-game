package com.game.player_service.repository;

import com.game.player_service.entity.Skin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SkinRepository extends JpaRepository<Skin, Integer> {

    List<Skin> findAll();
}