package com.game.player_service.controller;

import com.game.player_service.entity.User;
import com.game.player_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

	private final UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping("/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Integer id) {

		System.out.println("W endpoincie users/id dla " + id);
		return userService.getUserById(id)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@PostMapping("/{userId}/buy-skin/{skinId}")
	public ResponseEntity<String> buySkin(@PathVariable Integer userId, @PathVariable Integer skinId) {
		try {
			userService.buySkin(userId, skinId);
			return ResponseEntity.ok("Zakup udany");
		} catch (IllegalArgumentException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
}