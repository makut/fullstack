package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository repository) {
        this.userRepository = repository;
    }

    public List<User> getAll() {
        List<User> users = userRepository.findAll();
        return users;
    }

    public void addUser(User user) {
        userRepository.save(user);
    }

    public Optional<User> findByName(String username) {
        return this.userRepository.findByUsername(username);
    }
}
