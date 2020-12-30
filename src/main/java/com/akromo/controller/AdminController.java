package com.akromo.controller;


import com.akromo.models.Role;
import com.akromo.models.User;
import com.akromo.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;


@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public String index(Model model) {
        model.addAttribute("users", userService.listUsers());
        model.addAttribute("BDroles", userService.getAllRoles());
        return "admin/index";
    }

    @PostMapping()
    public String create(@RequestParam("userName") String userName, @RequestParam("email") String email,
                         @RequestParam("password") String password, @RequestParam("selectedRoles") String[] roles) {
        User user = new User();
        user.setUsername(userName);
        user.setPassword(password);
        user.setEmail(email);
        for (String name: roles) {
            user.getRoles().add(userService.getRoleByName(name));
        }
        userService.add(user);
        return "redirect:/admin";
    }

    @GetMapping("/{id}/edit")
    public String edit(@PathVariable("id") long id, Model model) {
        model.addAttribute("user", userService.getUser(id));
        model.addAttribute("BDroles", userService.getAllRoles());
        return "admin/edit";
    }

    @PostMapping("/{id}/edit")
    public String update(@ModelAttribute("user") User user, @RequestParam("selectedRoles") String[] roles) {
        List<Role> newList = new ArrayList<>();
        for (String name: roles) {
            newList.add(userService.getRoleByName(name));
        }
        user.setRoles(newList);
        userService.updateUser(user);
        return "redirect:/admin";
    }

    @PostMapping("/{id}/delete")
    public String delete(@PathVariable("id") long id) {
        userService.remove(id);
        return "redirect:/admin";
    }

    @ModelAttribute("CurrentUser")
    public User addUser(Principal principal) {
        User user = null;
        if (principal != null) {
            user = userService.getUserByName(principal.getName());
        }
        return user;
    }
}
