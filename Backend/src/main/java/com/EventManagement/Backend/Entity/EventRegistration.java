package com.EventManagement.Backend.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

public class EventRegistration {
    @Id

    @GeneratedValue
    private Long id;
    @ManyToOne
    private User user;
    @ManyToOne
    private Event event;
    private String name;
    private String email;
    private String phone;
    private String college;

    public EventRegistration(Long id, User user, Event event, String name, String email, String phone, String college) {
        this.id = id;
        this.user = user;
        this.event = event;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.college = college;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCollege() {
        return college;
    }

    public void setCollege(String college) {
        this.college = college;
    }
}
