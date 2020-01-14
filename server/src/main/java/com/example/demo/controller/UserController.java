package com.example.demo.controller;

import com.example.demo.model.Code;
import com.example.demo.model.User;
import com.example.demo.service.CodeService;
import com.example.demo.service.UserService;
import lombok.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Value
class RegisterData {
    String username;
    String password;
}

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
    public void createUser(@RequestBody RegisterData data) {
        User user = User.builder().username(data.getUsername()).password("{noop}" + data.getPassword()).build();
        System.out.println(user.toString());

        userService.addUser(user);
    }

    @GetMapping("/all-codes")
    public List<Code> getCodes() {
        return codeService.getAll();
    }
}
