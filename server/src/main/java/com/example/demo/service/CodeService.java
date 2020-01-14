package com.example.demo.service;

import com.example.demo.model.Code;
import com.example.demo.model.User;
import com.example.demo.repository.CodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CodeService {
    private final CodeRepository codeRepository;

    @Autowired
    public CodeService(CodeRepository repository) {
        this.codeRepository = repository;
    }

    public List<Code> getAll() {
        return codeRepository.findAll();
    }

    public List<MetaInformation> findByUser(User user) {
        return codeRepository.findByUserid(user.getId());
    }

    public void save(Code code) {
        codeRepository.save(code);
    }

    public Optional<Code> getById(Long id) {
        return codeRepository.findById(id);
    }

    public void deleteById(Long id) {
        codeRepository.deleteById(id);
    }
}
