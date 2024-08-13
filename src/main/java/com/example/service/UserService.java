package com.example.service;

import com.example.controller.CreateUserDto;
import com.example.model.User;
import com.example.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Long createUser(CreateUserDto createUserDto) {
        String encodedPassword = passwordEncoder.encode(createUserDto.getPassword());

        User entity = new User(null,
                createUserDto.getUsername(),
                encodedPassword,
                createUserDto.getEmail(),
                Instant.now(),
                null);
        User userSaved = userRepository.save(entity);
        return userSaved.getId();
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findById(Long.parseLong(id));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUser(String id) {

        boolean userExists = userRepository.existsById(Long.parseLong(id));

        if(userExists){
            userRepository.deleteById(Long.parseLong(id));
        }
    }
}