package com.example.demo.model;
import lombok.Data;

import javax.persistence.*;

@Entity(name = "Code")
@Data
public class Code {
    @Id
    Long id;

    @Column(name = "user_id")
    Long user_id;

    @Column(name = "code")
    String code;
}
