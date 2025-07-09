package com.EventManagement.Backend.Services;

import com.EventManagement.Backend.Entity.Event;
import com.EventManagement.Backend.Entity.EventRegistration;
import com.EventManagement.Backend.Entity.User;
import com.EventManagement.Backend.Repository.EventRepository;
import com.EventManagement.Backend.Repository.EventRegistrationRepository;
import com.EventManagement.Backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class RegistrationService {
    @Autowired
    private EventRegistrationRepository eventRegistrationRepository;
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private UserRepository userRepository;

    public EventRegistration registerUserForEvent(Long eventId, Long userId, Map<String,String> regData){
        Event event = eventRepository.findById(eventId).orElse(null);
        User user = userRepository.findById(userId).orElse(null);

        if (event == null || user == null) return null;

        EventRegistration reg = new EventRegistration();
        reg.setUser(user);
        reg.setEvent(event);
        reg.setName(regData.get("name"));
        reg.setEmail(regData.get("email"));
        reg.setPhone(regData.get("phone"));
        reg.setCollege(regData.get("college"));

        return eventRegistrationRepository.save(reg);
    }
}