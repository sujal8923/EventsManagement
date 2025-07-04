package com.EventManagement.Backend.Repository;

import com.EventManagement.Backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long > {
    User findByUsername(String username);


}
