package com.EventManagement.Backend.Services;

import com.EventManagement.Backend.Entity.User;
import com.EventManagement.Backend.Repository.EventRegistrationRepository;
import com.EventManagement.Backend.Repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private PasswordEncoder passwordEncode;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EventRegistrationRepository eventRegistrationRepository;
    public User register(User user) {
        if (!List.of("USER", "ADMIN", "SUPER_ADMIN").contains(user.getRole())) {
            user.setRole("USER");
        }
        user.setActive(true);

        
        user.setPassword(passwordEncode.encode(user.getPassword()));

        return userRepository.save(user);
    }
    public User login(String email, String password) {
        User user = userRepository.findByEmail(email);
        if(user.isActive()){
            if (user != null && user.getPassword().equals(password)) {
                return user;
            }
        }
        return null;
    }
    public List<User> getAll(){
        return userRepository.findAll();
    }
    public User updateUser(Long id , User updated){
        updated.setId(id);
        return userRepository.save(updated);
    }
        public void toggleUserStatus(Long id) {
        User user = getUserById(id);
        if (user != null) {
            user.setActive(!user.isActive());
            userRepository.save(user); 
        }
    }

    


    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
