package com.game.player_service.service;

import com.game.player_service.entity.Skin;
import com.game.player_service.entity.UserSkin;
import com.game.player_service.repository.UserSkinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserSkinService {

    private final UserSkinRepository userSkinRepository;

    @Autowired
    public UserSkinService(UserSkinRepository userSkinRepository) {
        this.userSkinRepository = userSkinRepository;
    }

    public List<Skin> getAllSkinsByUserId(Integer userId) {
        List<UserSkin> userSkins = userSkinRepository.findByUserId(userId);

        return userSkins.stream()
                .map(UserSkin::getSkin)
                .collect(Collectors.toList());
    }
}
