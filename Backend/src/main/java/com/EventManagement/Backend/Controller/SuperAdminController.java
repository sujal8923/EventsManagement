package com.EventManagement.Backend.Controller;

import com.EventManagement.Backend.Entity.Event;
import com.EventManagement.Backend.Entity.User;
import com.EventManagement.Backend.Services.EventService;
import com.EventManagement.Backend.Services.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/superadmin")
public class SuperAdminController {
    @Autowired
    private EventService eventService;

    @Autowired
    private UserService userService;

    @GetMapping("/events")
    public ResponseEntity<?> viewAllEvents(HttpSession session) {
        User user = (User) session.getAttribute("currentUser");
        if (user == null || !user.getRole().equals("SUPER_ADMIN")) {
            return ResponseEntity.status(403).body("Access Denied");
        }
        return ResponseEntity.ok(eventService.getAllEvent());
    }

    @PostMapping("/event")
    public ResponseEntity<?> addEvent(@RequestBody Event e, HttpSession session) {
        User user = (User) session.getAttribute("currentUser");
        if (user == null || !user.getRole().equals("SUPER_ADMIN")) {
            return ResponseEntity.status(403).body("Access Denied");
        }
        return ResponseEntity.ok(eventService.addEvent(e));
    }

    @PutMapping("/event/{id}")
    public ResponseEntity<?> updateEvent(@PathVariable Long id, @RequestBody Event e, HttpSession session) {
        User user = (User) session.getAttribute("currentUser");
        if (user == null || !user.getRole().equals("SUPER_ADMIN")) {
            return ResponseEntity.status(403).body("Access Denied");
        }
        return ResponseEntity.ok(eventService.updateEvent(id, e));
    }

    @DeleteMapping("/event/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id, HttpSession session) {
        User user = (User) session.getAttribute("currentUser");
        if (user == null || !user.getRole().equals("SUPER_ADMIN")) {
            return ResponseEntity.status(403).body("Access Denied");
        }
        eventService.deleteEvent(id);
        return ResponseEntity.ok("Deleted");
    }

    @PostMapping("/admin")
    public ResponseEntity<?> createAdmin(@RequestBody User newAdmin, HttpSession session) {
        User user = (User) session.getAttribute("currentUser");
        if (user == null || !user.getRole().equals("SUPER_ADMIN")) {
            return ResponseEntity.status(403).body("Access Denied");
        }
        if (!"ADMIN".equals(newAdmin.getRole())) {
            return ResponseEntity.badRequest().body("Only admins can be created here");
        }
        return ResponseEntity.ok(userService.register(newAdmin));
    }

    @GetMapping("/admins")
    public ResponseEntity<?> getAllAdmins(HttpSession session) {
        User user = (User) session.getAttribute("currentUser");
        if (user == null || !user.getRole().equals("SUPER_ADMIN")) {
            return ResponseEntity.status(403).body("Access Denied");
        }
        List<User> admins = userService.getAll().stream()
                .filter(u -> "ADMIN".equals(u.getRole()))
                .toList();
        return ResponseEntity.ok(admins);
    }

    @PutMapping("/admin/{id}")
    public ResponseEntity<?> updateAdmin(@PathVariable Long id, @RequestBody User updated, HttpSession session) {
        User user = (User) session.getAttribute("currentUser");
        if (user == null || !user.getRole().equals("SUPER_ADMIN")) {
            return ResponseEntity.status(403).body("Access Denied");
        }
        if (!"ADMIN".equals(updated.getRole())) {
            return ResponseEntity.badRequest().body("Only admins can be updated here");
        }
        return ResponseEntity.ok(userService.updateUser(id, updated));
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<?> deleteAdmin(@PathVariable Long id, HttpSession session) {
        User user = (User) session.getAttribute("currentUser");
        if (user == null || !user.getRole().equals("SUPER_ADMIN")) {
            return ResponseEntity.status(403).body("Access Denied");
        }
        User target = userService.getUserById(id);
        if (!"ADMIN".equals(target.getRole())) {
            return ResponseEntity.badRequest().body("Only ADMIN accounts can be deleted by superadmin");
        }
        userService.deleteUser(id);
        return ResponseEntity.ok("Deleted");
    }
}
