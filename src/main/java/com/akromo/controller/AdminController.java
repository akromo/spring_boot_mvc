package com.akromo.controller;


import com.akromo.dao.ManDAO;
import com.akromo.models.Man;
import com.akromo.models.Passport;
import com.akromo.models.Role;
import com.akromo.models.User;
import com.akromo.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;


@Controller
@RequestMapping("/admin")
@Slf4j
public class AdminController {
    private final UserService userService;
    private final ManDAO md;

    public AdminController(UserService userService, ManDAO md) {
        this.userService = userService;
        this.md = md;
    }

    @GetMapping
    public String index(Model model) {
        Passport passport = new Passport();
        passport.setSerial("1488");
        passport.setNumber("228822");
        Man man = new Man();
        man.setFirstName("Shkololo");
        man.setLastName("Trololo");
        man.setDateOfBirth("just now");
        man.setPassport(passport);
        md.saveMan(man);
        log.info("WARN Logger is here WARN {}", model);
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
        User user = new User();
        user.setEmail("Test");
        user.getRoles().add(new Role("ADMIN"));
        user.getRoles().add(new Role("User"));
//        if (principal != null) {
//            user = userService.getUserByName(principal.getName());
//        }
        return user;
    }
}
