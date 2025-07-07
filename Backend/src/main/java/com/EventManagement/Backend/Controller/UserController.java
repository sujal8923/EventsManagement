package com.EventManagement.Backend.Controller;

import com.EventManagement.Backend.Entity.EventRegistration;
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
            @RequestBody Map<String, String> regData
    ) {
        Long userId = Long.parseLong(regData.get("userId"));
        EventRegistration registration = registrationService.registerUserForEvent(eventId, userId, regData);
        if (registration == null) return ResponseEntity.badRequest().body("Invalid event or user");
        return ResponseEntity.ok(registration);
    }
}
