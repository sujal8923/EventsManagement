package com.EventManagement.Backend.Controller;

import com.EventManagement.Backend.Entity.User;
import com.EventManagement.Backend.Services.EventService;
import com.EventManagement.Backend.Services.RegistrationService;
import com.EventManagement.Backend.Services.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;



@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173",allowCredentials = "true")
public class UserController {
    @Autowired
    private EventService eventService;

    @Autowired
    private RegistrationService registrationService;
    @GetMapping("/event")
    private ResponseEntity<?> getEvent(){
        return ResponseEntity.ok(eventService.getAllEvent());
    }

    @PostMapping("/register/{eventId}")
    public ResponseEntity<?> registerEvent(
            @PathVariable Long eventId,
            @RequestBody Map<String, String> regData,
            HttpSession session
    ) {
        User user = (User) session.getAttribute("currentUser");
        if (user == null || !user.getRole().equals("USER")) return ResponseEntity.status(403).body("Access Denied");
        return ResponseEntity.ok(registrationService.registerUserForEvent(eventId, user, regData));
    }
}
