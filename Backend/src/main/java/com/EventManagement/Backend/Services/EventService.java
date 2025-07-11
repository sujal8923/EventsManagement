package com.EventManagement.Backend.Services;

import com.EventManagement.Backend.Entity.Event;
import com.EventManagement.Backend.Repository.EventRepository;
import com.EventManagement.Backend.Repository.EventRegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private EventRegistrationRepository eventRegistrationRepository;

    public Event addEvent(Event event){
        return eventRepository.save(event);
    }

    public List<Event> getAllEvent(){
        return eventRepository.findAll();
    }

    public Event updateEvent(Long id, Event updated){
        updated.setId(id);
        return eventRepository.save(updated);
    }

    public void deleteEvent(Long id){
        // eventRegistrationRepository.deleteByEventId(id);
        eventRepository.deleteById(id);
    }
}