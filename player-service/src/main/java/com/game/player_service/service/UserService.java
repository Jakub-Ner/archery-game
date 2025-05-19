package com.game.player_service.service;

import com.game.player_service.entity.*;
import com.game.player_service.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {

	private final UserRepository userRepository;

	private final SkinRepository skinRepository;

	private final UserSkinRepository userSkinRepository;

	@Autowired
	public UserService(UserRepository userRepository, SkinRepository skinRepository, UserSkinRepository userSkinRepository) {

		this.userRepository = userRepository;
		this.skinRepository = skinRepository;
		this.userSkinRepository = userSkinRepository;
	}

	public Optional<User> getUserById(Integer userId){
		return userRepository.findById(userId);
	}

	@Transactional
	public void buySkin(Integer userId, Integer skinId) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new IllegalArgumentException("Użytkownik nie istnieje"));

		Skin skin = skinRepository.findById(skinId)
				.orElseThrow(() -> new IllegalArgumentException("Skórka nie istnieje"));

		UserSkinId userSkinId = new UserSkinId(userId, skinId);

		if (userSkinRepository.existsById(userSkinId)) {
			throw new IllegalArgumentException("Użytkownik już posiada tę skórkę");
		}

		if (user.getGems() < skin.getPrice()) {
			throw new IllegalArgumentException("Nie stać cię na tę skórkę");
		}

		user.setGems(user.getGems() - skin.getPrice());
		userRepository.save(user);

		UserSkin userSkin = new UserSkin();
		userSkin.setId(userSkinId);
		userSkin.setUser(user);
		userSkin.setSkin(skin);
		userSkin.setSelected(false);

		userSkinRepository.save(userSkin);
	}

}
