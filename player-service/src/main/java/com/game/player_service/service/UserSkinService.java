package com.game.player_service.service;

import com.game.player_service.entity.*;
import com.game.player_service.exception.SkinNotFoundException;
import com.game.player_service.repository.UserSkinRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
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

    public List<UserSkin> findByUserId(Integer userId) {
        return userSkinRepository.findByUserId(userId);
    }

    @Transactional
    public void selectSkin(Integer userId, Integer skinId) {

        Optional<UserSkin> currentlySelected = userSkinRepository.findByIdUserIdAndIsSelectedTrue(userId);
        if (currentlySelected.isEmpty()) {

            throw new SkinNotFoundException("User doesn't exist");
        }

        currentlySelected.get().setSelected(false);
        userSkinRepository.save(currentlySelected.get());

        userSkinRepository.findByIdUserIdAndIdSkinId(userId, skinId).ifPresentOrElse(
                userSkin -> {
                    userSkin.setSelected(true);
                    userSkinRepository.save(userSkin);
                },
                () -> {
                    throw new SkinNotFoundException("User doesn't have this skin");
                }
        );
    }
}
