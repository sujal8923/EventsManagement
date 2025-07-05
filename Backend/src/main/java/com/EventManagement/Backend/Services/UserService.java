package com.EventManagement.Backend.Services;

import com.EventManagement.Backend.Entity.User;
import com.EventManagement.Backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public User register(User user){
        if(!List.of("USER","ADMIN","SUPER_ADMIN").contains(user.getRole())){
            user.setRole("USER");
        }
        return userRepository.save(user);
    }
    public User login(String name, String password) {
        User user = userRepository.findByUserName(name);
        if (user != null && user.getPassword().equals(password)) {
            return user;
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
    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
