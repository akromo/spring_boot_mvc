package com.akromo.controller;

import com.akromo.models.Role;
import com.akromo.models.User;
import com.akromo.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/rest")
public class RESTController {

    private final UserService userService;

    public RESTController(UserService userService) {
        this.userService = userService;
    }

    private User prepareUser(User rawUser) {
        User preparedUser = new User();
        preparedUser.setUsername(rawUser.getUsername());
        preparedUser.setEmail(rawUser.getEmail());
        preparedUser.setId(rawUser.getId());
        for (Role role: rawUser.getRoles()) {
            preparedUser.getRoles().add(new Role(role.getName()));
        }
        return preparedUser;
    }

    @GetMapping("/user/{id}")
    public User getUser(@PathVariable long id) {
        User rawUser = userService.getUser(id);
        return prepareUser(rawUser);
    }

    @GetMapping("/users")
    public List<User> users() {
        List<User> preparedUsers = new ArrayList<>();
        for(User user: userService.listUsers()) {
            preparedUsers.add(prepareUser(user));
        }
        return preparedUsers;
    }

    @GetMapping("/roles")
    public List<Role> getRoles() {
        return userService.getAllRoles();
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
