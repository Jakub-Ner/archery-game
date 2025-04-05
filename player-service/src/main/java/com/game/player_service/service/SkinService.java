package com.game.player_service.service;

import com.game.player_service.entity.Skin;
import com.game.player_service.entity.UserSkin;
import com.game.player_service.repository.SkinRepository;
import com.game.player_service.repository.UserSkinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SkinService {

    private final SkinRepository skinRepository;
    private final UserSkinRepository userSkinRepository;

    @Autowired
    public SkinService(SkinRepository skinRepository, UserSkinRepository userSkinRepository) {
        this.skinRepository = skinRepository;
        this.userSkinRepository = userSkinRepository;
    }

    public List<Skin> getAllSkins() {
        return skinRepository.findAll();
    }

    public List<Skin> getAllSkinsNotOwnedByUser(Integer userId) {

        List<UserSkin> userSkins = userSkinRepository.findByUserId(userId);

        Set<Integer> ownedSkinIds = userSkins.stream()
                .map(userSkin -> userSkin.getSkin().getId())
                .collect(Collectors.toSet());

        List<Skin> allSkins = skinRepository.findAll();

        return allSkins.stream()
                .filter(skin -> !ownedSkinIds.contains(skin.getId()))
                .collect(Collectors.toList());
    }
}