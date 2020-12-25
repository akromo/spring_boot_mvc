package com.akromo.controller;

import com.akromo.models.User;
import com.akromo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;

@RequestMapping
@Controller
public class HomeController {

    private UserService userService;

    @Autowired
    private void setUserService(UserService us) {
        this.userService = us;
    }

    @RequestMapping("/")
    public String getIndex(){
        return "redirect:/login";
    }

    @RequestMapping("/user")
    public String getProfile(Model model, Principal principal) {
        User user = userService.getUserByName(principal.getName());
        model.addAttribute("roles", user.getRoles());
        return "/home/user";
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
