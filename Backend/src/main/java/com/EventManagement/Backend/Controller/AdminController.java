package com.EventManagement.Backend.Controller;

import com.EventManagement.Backend.Entity.User;
import com.EventManagement.Backend.Services.EventService;
import com.EventManagement.Backend.Services.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private UserService userService;

    @Autowired
    private EventService eventService;

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers(HttpSession session) {
        User user = (User) session.getAttribute("currentUser");
        if (user == null || !user.getRole().equals("ADMIN")) {
            return ResponseEntity.status(403).body("Access Denied");
        }
        // Admin should only see users with role USER
        List<User> users = userService.getAll().stream()
                .filter(u -> "USER".equals(u.getRole()))
                .toList();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User updated, HttpSession session) {
        User user = (User) session.getAttribute("currentUser");
        if (user == null || !user.getRole().equals("ADMIN")) {
            return ResponseEntity.status(403).body("Access Denied");
        }
        if (!"USER".equals(updated.getRole())) {
            return ResponseEntity.badRequest().body("Admins can only update USER role accounts");
        }
        return ResponseEntity.ok(userService.updateUser(id, updated));
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id, HttpSession session) {
        User user = (User) session.getAttribute("currentUser");
        if (user == null || !user.getRole().equals("ADMIN")) {
            return ResponseEntity.status(403).body("Access Denied");
        }
        User target = userService.getUserById(id);
        if (!"USER".equals(target.getRole())) {
            return ResponseEntity.badRequest().body("Admins can only delete USER role accounts");
        }
        userService.deleteUser(id);
        return ResponseEntity.ok("Deleted");
    }

    @GetMapping("/events")
    public ResponseEntity<?> getAllEvents(HttpSession session) {
        User user = (User) session.getAttribute("currentUser");
        if (user == null || !user.getRole().equals("ADMIN")) {
            return ResponseEntity.status(403).body("Access Denied");
        }
        return ResponseEntity.ok(eventService.getAllEvent());
    }
}
