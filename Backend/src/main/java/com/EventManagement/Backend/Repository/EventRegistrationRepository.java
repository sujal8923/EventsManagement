package com.EventManagement.Backend.Repository;

import com.EventManagement.Backend.Entity.EventRegistration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRegistrationRepository extends JpaRepository<EventRegistration, Long> {
    void deleteByUserId(Long userId); // 🔸 add this
}
