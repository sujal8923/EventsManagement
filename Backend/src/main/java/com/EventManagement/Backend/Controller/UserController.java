package com.EventManagement.Backend.Controller;

import com.EventManagement.Backend.Entity.EventRegistration;
import com.EventManagement.Backend.Services.EventService;
import com.EventManagement.Backend.Services.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/user")
// @CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})

public class UserController {
    @Autowired
    private EventService eventService;
    @Autowired
    private RegistrationService registrationService;

    @GetMapping("/event")
    public ResponseEntity<?> getEvent(){
        return ResponseEntity.ok(eventService.getAllEvent());
    }
@PreAuthorize("hasRole('USER')")
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