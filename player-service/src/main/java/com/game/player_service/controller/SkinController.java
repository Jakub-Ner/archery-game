package com.game.player_service.controller;

import com.game.player_service.entity.Skin;
import com.game.player_service.service.SkinService;
import com.game.player_service.service.UserSkinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/skins")
public class SkinController {

    private final SkinService skinService;
    private final UserSkinService userSkinService;

    @Autowired
    public SkinController(SkinService skinService, UserSkinService userSkinService) {
        this.skinService = skinService;
		this.userSkinService = userSkinService;
	}

    @GetMapping
    public List<Skin> getAllSkins() {
        return skinService.getAllSkins();
    }

    @GetMapping("/unowned/{userId}")
    public List<Skin> getAllSkinsNotOwnedByUser(@PathVariable Integer userId) {

        System.out.println("w /skins/unowned/{userId}");
        return skinService.getAllSkinsNotOwnedByUser(userId);
    }

    @GetMapping("/owned/{userId}")
    public List<Skin> getAllSkinByUserId(@PathVariable Integer userId) {

        System.out.println("w /skins/owned/{userId}");
        return skinService.getAllSkinsByUserId(userId);
    }

    @GetMapping("/selected/{userId}")
    public Skin getSelectedSkinByUserId(@PathVariable Integer userId) {

        System.out.println("w /skins/selected/{userId}");
        return skinService.getSelectedSkinByUserId(userId);
    }

    @PutMapping("/select")
    public void selectSkin(@RequestParam Integer userId, @RequestParam Integer skinId) {

        System.out.println("w /skins/select");
        userSkinService.selectSkin(userId, skinId);
    }
}
