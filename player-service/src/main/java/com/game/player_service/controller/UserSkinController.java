package com.game.player_service.controller;

import com.game.player_service.entity.Skin;
import com.game.player_service.service.UserSkinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/userskin")
public class UserSkinController {

    private final UserSkinService userSkinService;

    @Autowired
    public UserSkinController(UserSkinService userSkinService) {
        this.userSkinService = userSkinService;
    }

    @GetMapping("/{userId}/skins")
    public List<Skin> getAllSkinByUserId(@PathVariable Integer userId) {
        return userSkinService.getAllSkinsByUserId(userId);
    }
}
