package com.EventManagement.Backend.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

public class Event {
    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String imageUrl;
    private String description;
    private String date;

    public Event(Long id, String title, String imageUrl, String description, String date) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
