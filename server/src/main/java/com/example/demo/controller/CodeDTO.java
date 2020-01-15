package com.example.demo.controller;

import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Builder
public class CodeDTO {
    Long id;
    String name;
    String code;
    Timestamp added;
}
