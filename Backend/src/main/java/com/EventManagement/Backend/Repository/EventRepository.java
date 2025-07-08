package com.EventManagement.Backend.Repository;

import com.EventManagement.Backend.Entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
    public void deleteById(Long id);
}
