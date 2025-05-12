package com.game.player_service.service;

import com.game.player_service.entity.Skin;
import com.game.player_service.entity.UserSkin;
import com.game.player_service.repository.SkinRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SkinService {

    private final SkinRepository skinRepository;
    private final UserSkinService userSkinService;

    public SkinService(SkinRepository skinRepository,  UserSkinService userSkinService) {
        this.skinRepository = skinRepository;
        this.userSkinService = userSkinService;
    }

    public List<Skin> getAllSkins() {
        return skinRepository.findAll();
    }

    public List<Skin> getAllSkinsNotOwnedByUser(Integer userId) {

        List<UserSkin> userSkins = userSkinService.findByUserId(userId);

        Set<Integer> ownedSkinIds = userSkins.stream()
                .map(userSkin -> userSkin.getSkin().getId())
                .collect(Collectors.toSet());

        List<Skin> allSkins = skinRepository.findAll();

        return allSkins.stream()
                .filter(skin -> !ownedSkinIds.contains(skin.getId()))
                .collect(Collectors.toList());
    }

    public List<Skin> getAllSkinsByUserId(Integer userId) {
        return userSkinService.getAllSkinsByUserId(userId);
    }

    public Skin getSelectedSkinByUserId(Integer userId) {
        return userSkinService.findByUserId(userId).stream()
                .filter(UserSkin::isSelected)
                .map(UserSkin::getSkin)
                .findFirst()
                .orElse(null);
    }
}