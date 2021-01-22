package com.akromo.controller;

import com.akromo.models.Role;
import com.akromo.models.User;
import com.akromo.service.UserService;
import org.springframework.boot.autoconfigure.cassandra.CassandraProperties;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
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
        for (Role role : rawUser.getRoles()) {
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
        for (User user : userService.listUsers()) {
            preparedUsers.add(prepareUser(user));
        }
        return preparedUsers;
    }

//    @GetMapping("/roles")
//    public List<Role> getRoles() {
//        return userService.getAllRoles();
//    }

    @PostMapping("/create")
    public void createUser(@RequestBody User user) {
        List<Role> newRoleList = new ArrayList<>();
        for (Role role: user.getRoles()) {
            newRoleList.add(userService.getRoleByName(role.getName()));
        }
        user.setRoles(newRoleList);
        userService.add(user);
    }

    @PostMapping("/edit")
    public void eitUser(@RequestBody User user) {
        List<Role> newRoleList = new ArrayList<>();
        for (Role role: user.getRoles()) {
            newRoleList.add(userService.getRoleByName(role.getName()));
        }
        user.setRoles(newRoleList);
        userService.updateUser(user);
    }

    @PostMapping("/delete/{id}")
    public void delete(@PathVariable("id") long id) {
        userService.remove(id);
    }
}
