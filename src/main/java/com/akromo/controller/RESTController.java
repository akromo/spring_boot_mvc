package com.akromo.controller;

import com.akromo.models.User;
import com.akromo.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rest")
public class RESTController {

    private final UserService userService;

    public RESTController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> users() {
        return null;
    }

    @PostMapping("/create")
    public User createUser() {
        return null;
    }

    @PostMapping("/edit")
    public User eitUser() {
        return null;
    }
}
