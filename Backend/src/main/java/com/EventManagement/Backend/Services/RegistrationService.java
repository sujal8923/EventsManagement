package com.EventManagement.Backend.Services;

import com.EventManagement.Backend.Entity.Event;
import com.EventManagement.Backend.Entity.EventRegistration;
import com.EventManagement.Backend.Entity.User;
import com.EventManagement.Backend.Repository.EventRegistrationRepository;
import com.EventManagement.Backend.Repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class RegistrationService {
    @Autowired
    private EventRegistrationRepository eventRegistrationRepository;
    @Autowired
    private EventRepository eventRepository;
    public String registerUserForEvent(Long eventId, User user, Map<String,String> regData){
        Event event = eventRepository.findById(eventId).orElse(null);
        EventRegistration reg = new EventRegistration();
        reg.setUser(user);
        reg.setEvent(event);
        reg.setName(regData.get("name"));
        reg.setEmail(regData.get("email"));
        reg.setPhone(regData.get("phone"));
        reg.setCollege(regData.get("college"));
        eventRegistrationRepository.save(reg);
        return "registration sucess";
    }



}
