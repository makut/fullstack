package com.example.demo.controller;

import com.example.demo.model.Code;
import com.example.demo.model.User;
import com.example.demo.service.CodeService;
import com.example.demo.service.MetaInformation;
import com.example.demo.service.UserService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@RestController
public class CodeController {
    @Autowired
    private CodeService code_serv;

    @Autowired
    private UserService user_serv;

    Code fromDTO(CodeDTO code) {
        UserDetails user_det = (UserDetails)SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        String username = user_det.getUsername();
        Optional<User> user = user_serv.findByName(username);
        if (!user.isPresent()) {
            return null;
        }
        User u = user.get();
        return Code.builder()
                .id(code.getId())
                .name(code.getName())
                .userid(u.getId())
                .added(code.getAdded())
                .code(code.getCode())
                .build();
    }

    @GetMapping("/user-pastes")
    public List<MetaInformation> getCodesByUser() {
        UserDetails user_det = (UserDetails)SecurityContextHolder
                .getContext().getAuthentication()
                .getPrincipal();
        String username = user_det.getUsername();
        Optional<User> user = user_serv.findByName(username);
        if (!user.isPresent()) {
            return null;
        }
        User u = user.get();
        return code_serv.findByUser(u);
    }

    @PostMapping(value = "/add-code", consumes = "application/json")
    public void save(@RequestBody CodeDTO code) {
        code_serv.save(fromDTO(code));
    }

    @GetMapping("/get-code")
    public Code getCodeById(@RequestParam("id") Long id) {
        Optional<Code> code = code_serv.getById(id);
        return code.orElse(null);
    }

    @PostMapping("/delete-code")
    public void deleteCodeById(@RequestParam("id") Long id) throws AuthenticationException {
        UserDetails user_det = (UserDetails)SecurityContextHolder
                .getContext().getAuthentication()
                .getPrincipal();
        String username = user_det.getUsername();
        User user = user_serv.findByName(username).get();

        Code code = code_serv.getById(id).get();

        if (!code.getUserid().equals(user.getId())) {
            throw new RuntimeException("This is not your code");
        }

        code_serv.deleteById(id);
    }
}