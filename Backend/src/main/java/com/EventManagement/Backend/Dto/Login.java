package com.EventManagement.Backend.Dto;



public class Login {
    private String Email;
    private String passwords;


    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public String getPasswords() {
        return passwords;
    }

    public void setPasswords(String passwords) {
        this.passwords = passwords;
    }
}
