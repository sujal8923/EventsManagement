package com.EventManagement.Backend.Controller;

import com.EventManagement.Backend.Entity.User;
import com.EventManagement.Backend.Services.EventService;
import com.EventManagement.Backend.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
public class AdminController {
    @Autowired
    private UserService userService;
    @Autowired
    private EventService eventService;

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userService.getAll().stream()
                .filter(u -> "USER".equals(u.getRole()))
                .toList();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User updated) {
        if (!"USER".equals(updated.getRole())) {
            return ResponseEntity.badRequest().body("Admins can only update USER role accounts");
        }
        return ResponseEntity.ok(userService.updateUser(id, updated));
    }
    
    @PutMapping("/user/toggle/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }

        userService.toggleUserStatus(id); // toggling inside service

        // After toggle, fetch again to get updated status
        User updatedUser = userService.getUserById(id);
        return ResponseEntity.ok("User is now " + (updatedUser.isActive() ? "active" : "inactive"));
    }

    @GetMapping("/events")
    public ResponseEntity<?> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvent());
    }
}