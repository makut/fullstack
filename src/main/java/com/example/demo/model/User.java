package com.example.demo.model;

import lombok.Data;

import javax.persistence.*;
@Entity(name = "testtbl")
@Data
public class User {
    @Id
    Long id;

    @Column(name = "name")
    String name;
};
