package com.example.demo.controller;

import com.example.demo.model.Code;
import com.example.demo.model.User;
import com.example.demo.service.CodeService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private CodeService codeService;

    @GetMapping("/all-users")
    public List<User> getUsers() {
        return userService.getAll();
    }

    @PostMapping("/register")
    public void createUser(@RequestBody User user) {
        System.out.println(user.toString());
        userService.addUser(user);
    }

    @GetMapping("/all-codes")
    public List<Code> getCodes() {
        return codeService.getAll();
    }
}
