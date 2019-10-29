package com.example.demo.model;

import lombok.Data;
import javax.persistence.*;

@Entity(name = "User")
@Data
public class User {
    @Id
    Long id;

    @Column(name = "username")
    String username;

    @Column(name = "password")
    String password;
}
