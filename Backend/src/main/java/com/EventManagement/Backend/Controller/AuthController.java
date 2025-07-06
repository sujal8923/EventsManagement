package com.EventManagement.Backend.Controller;

import com.EventManagement.Backend.Entity.User;
import com.EventManagement.Backend.Services.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class AuthController {
    @Autowired
    private UserService userService;
    @PostMapping("/register")
    public String register(@RequestBody User user){
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }

        userService.register(user);
        return "Registration sucessfull";
    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String,String> body, HttpSession httpSession){

        User user = userService.login(body.get("email"),body.get("password"));
        if (user == null){
            return ResponseEntity.status(401).body("not logged in");
        }
        httpSession.setAttribute("currentUser",user);
        return ResponseEntity.ok("Login sucessfull");
    }
    @GetMapping("/logout")
    public String logOut(HttpSession httpSession){
        httpSession.invalidate();
        return "logout sucess";
    }
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(HttpSession session) {
        User user = (User) session.getAttribute("currentUser");
        if (user == null) return ResponseEntity.status(401).body("Not logged in");
        return ResponseEntity.ok(user);
    }
}
