package com.EventManagement.Backend.Controller;

import com.EventManagement.Backend.Entity.Event;
import com.EventManagement.Backend.Entity.User;
import com.EventManagement.Backend.Services.EventService;
import com.EventManagement.Backend.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/superadmin")
@CrossOrigin(origins = "http://localhost:5174", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
public class SuperAdminController {
    @Autowired
    private EventService eventService;
    @Autowired
    private UserService userService;

    @GetMapping("/events")
    public ResponseEntity<?> viewAllEvents() {

        return ResponseEntity.ok(eventService.getAllEvent());
    }

    @PostMapping("/event")
    public ResponseEntity<?> addEvent(@RequestBody Event e) {


        return ResponseEntity.ok(eventService.addEvent(e));
    }

    @PutMapping("/event/{id}")
    public ResponseEntity<?> updateEvent(@PathVariable Long id, @RequestBody Event e) {


        return ResponseEntity.ok(eventService.updateEvent(id, e));
    }

    @DeleteMapping("/event/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) {

        eventService.deleteEvent(id);
        return ResponseEntity.ok("Deleted");
    }

    @PostMapping("/admin")
    public ResponseEntity<?> createAdmin(@RequestBody User newAdmin) {
        return ResponseEntity.ok(userService.register(newAdmin));
    }

    @GetMapping("/admins")
    public ResponseEntity<?> getAllAdmins() {

        List<User> admins = userService.getAll().stream()
                .filter(u -> "ADMIN".equals(u.getRole()))
                .toList();
        return ResponseEntity.ok(admins);
    }

    @PutMapping("/admin/{id}")
    public ResponseEntity<?> updateAdmin(@PathVariable Long id, @RequestBody User updated) {

        if (!"ADMIN".equals(updated.getRole())) {
            return ResponseEntity.badRequest().body("Only admins can be updated here");
        }
        return ResponseEntity.ok(userService.updateUser(id, updated));
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<?> deleteAdmin(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("Deleted");
    }
    
@GetMapping("/users")
public ResponseEntity<?> getAllUsers() {
    List<User> allUsers = userService.getAll().stream()
            .filter(u -> "USER".equalsIgnoreCase(u.getRole()))
            .toList();
    return ResponseEntity.ok(allUsers);
}

}