package com.example.cagefree.Service;

import java.util.List;

import com.example.cagefree.Pojo.TrainingTypePojo;

public interface TrainingTypeService {

    TrainingTypePojo createTrainingType(TrainingTypePojo trainingTypePojo);

    TrainingTypePojo updateTrainingType(Long id, TrainingTypePojo trainingTypePojo);

    void deleteTrainingType(Long id);

    TrainingTypePojo getTrainingTypeById(Long id);

    List<TrainingTypePojo> getAllTrainingTypes();

    List<TrainingTypePojo> getTrainingTypesByCategory(String category);  // New method
}
