package com.example.demo;

import com.example.demo.controller.CodeController;
import com.example.demo.controller.CodeDTO;
import com.example.demo.model.Code;
import com.example.demo.service.CodeService;
import com.example.demo.service.MetaInformation;
import com.example.demo.service.UserService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;

import static org.junit.jupiter.api.Assertions.*;

import java.sql.Timestamp;
import java.util.Comparator;
import java.util.List;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class CodeControllerTests {
    @Autowired
    CodeService code_serv;

    @Autowired
    UserService user_serv;

    @Autowired
    CodeController code_contr;

    @BeforeAll
    void setup() {
        Authentication a = new TestingAuthenticationToken(User.builder()
                .username("testuser")
                .roles("USER")
                .password("{noop}ti")
                .build(), null);
        SecurityContextHolder.getContext().setAuthentication(a);

        user_serv.addUser(com.example.demo.model.User.builder().username("testuser").password("dfg").build());
        Long userid = user_serv.findByName("testuser").get().getId();
        code_serv.save(
                Code.builder()
                        .name("Code1")
                        .userid(userid)
                        .added(new Timestamp(1000))
                        .code("000")
                        .build()
        );

        code_serv.save(
                Code.builder()
                        .name("Code2")
                        .userid(userid)
                        .added(new Timestamp(2000))
                        .code("111")
                        .build()
        );

        code_serv.save(
                Code.builder()
                        .name("Code3")
                        .userid(userid + 1)
                        .added(new Timestamp(3000))
                        .code("222")
                        .build()
        );
    }

    @Test
    void codesByUser() {
        List<MetaInformation> result = code_contr.getCodesByUser();
        assertEquals(result.size(), 2);
        result.sort(Comparator.comparing(MetaInformation::getId));
        assertTrue(
                result.get(0).getName().equals("Code1") &&
                        result.get(0).getAdded().equals(new Timestamp(1000)));
        assertTrue(
                result.get(1).getName().equals("Code2") &&
                        result.get(1).getAdded().equals(new Timestamp(2000)));
    }

    @Test
    void codeById() {
        Code code = code_contr.getCodeById(3L);
        assertEquals(code.getCode(), "000");
    }

    @Test
    void nonExistingCodeById() {
        Code code = code_contr.getCodeById(100L);
        assertNull(code);
    }

    @Test
    void deleteCode() {
        code_contr.deleteCodeById(3L);
        assertFalse(code_serv.getById(3L).isPresent());
    }

    @Test
    void addCode() {
        code_contr.save(
                CodeDTO.builder()
                .code("awdawd")
                .added(new Timestamp(444))
                .name("awd")
                .build()
        );

        assertEquals(code_serv.getById(6L).get().getCode(), "awdawd");
    }
}
