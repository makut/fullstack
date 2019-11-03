package com.example.demo.model;

import lombok.Data;
import lombok.Generated;

import javax.persistence.*;

@Entity(name = "User")
@Data
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long id;

    @Column(name = "username")
    String username;

    @Column(name = "password")
    String password;
}