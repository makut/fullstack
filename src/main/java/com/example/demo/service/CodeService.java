package com.example.demo.service;

import com.example.demo.model.Code;
import com.example.demo.repository.CodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CodeService {
    private final CodeRepository codeRepository;

    @Autowired
    public CodeService(CodeRepository repository) {
        this.codeRepository = repository;
    }

    public List<Code> getAll() {
        List<Code> codes = codeRepository.findAll();
        return codes;
    }
}
