package com.game.player_service.controller;

import com.game.player_service.entity.Skin;
import com.game.player_service.service.SkinService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/skins")
public class SkinController {

    private final SkinService skinService;

    public SkinController(SkinService skinService) {
        this.skinService = skinService;
    }

    @GetMapping
    public List<Skin> getAllSkins() {
        return skinService.getAllSkins();
    }

    @GetMapping("/unowned/{userId}")
    public List<Skin> getAllSkinsNotOwnedByUser(@PathVariable Integer userId) {
        return skinService.getAllSkinsNotOwnedByUser(userId);
    }

    @GetMapping("/owned/{userId}")
    public List<Skin> getAllSkinByUserId(@PathVariable Integer userId) {
        return skinService.getAllSkinsByUserId(userId);
    }

    @GetMapping("/selected/{userId}")
    public Skin getSelectedSkinByUserId(@PathVariable Integer userId) {
        return skinService.getSelectedSkinByUserId(userId);
    }
}
