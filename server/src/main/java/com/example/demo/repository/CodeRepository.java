package com.example.demo.repository;

import com.example.demo.model.Code;
import com.example.demo.service.MetaInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CodeRepository extends JpaRepository<Code, Long> {
    List<MetaInformation> findByUserid(Long id);
}
