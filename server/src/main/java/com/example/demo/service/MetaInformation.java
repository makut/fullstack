package com.example.demo.service;

import lombok.Builder;

import java.sql.Timestamp;

public interface MetaInformation {
    Long getId();
    String getName();
    Timestamp getAdded();
}
