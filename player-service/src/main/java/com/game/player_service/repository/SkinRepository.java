package com.game.player_service.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.game.player_service.entity.Skin;
import org.springframework.lang.NonNull;


public interface SkinRepository extends JpaRepository<Skin, Integer> {
@Override
@NonNull
    List<Skin> findAll();
}