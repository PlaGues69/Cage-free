package com.example.cagefree.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.cagefree.Entity.TrainingType;

@Repository
public interface TrainingTypeRepository extends JpaRepository<TrainingType, Long> {
    List<TrainingType> findByCategory(String category);  // New method
}
