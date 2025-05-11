package com.game.player_service.service;

import com.game.player_service.entity.User;
import com.game.player_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

	private final UserRepository userRepository;

	@Autowired
	public UserService(UserRepository userRepository) {

		this.userRepository = userRepository;
	}

	public Optional<User> getUserById(Integer userId){
		return userRepository.findById(userId);
	}
}
