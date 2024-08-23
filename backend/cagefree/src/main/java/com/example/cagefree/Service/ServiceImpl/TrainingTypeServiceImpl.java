package com.example.cagefree.Service.ServiceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.cagefree.Entity.TrainingType;
import com.example.cagefree.Pojo.TrainingTypePojo;
import com.example.cagefree.Repository.TrainingTypeRepository;
import com.example.cagefree.Service.TrainingTypeService;

@Service
public class TrainingTypeServiceImpl implements TrainingTypeService {

    @Autowired
    private TrainingTypeRepository trainingTypeRepository;

    @Override
    public TrainingTypePojo createTrainingType(TrainingTypePojo trainingTypePojo) {
        TrainingType trainingType = new TrainingType();
        trainingType.setType(trainingTypePojo.getType());
        trainingType.setPrice(trainingTypePojo.getPrice());
        trainingType.setDescription(trainingTypePojo.getDescription());
        trainingType.setCategory(trainingTypePojo.getCategory());  // Set category
        TrainingType savedTrainingType = trainingTypeRepository.save(trainingType);
        return convertToPojo(savedTrainingType);
    }

    @Override
    public TrainingTypePojo updateTrainingType(Long id, TrainingTypePojo trainingTypePojo) {
        TrainingType existingTrainingType = trainingTypeRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Training type not found with id: " + id));
        existingTrainingType.setType(trainingTypePojo.getType());
        existingTrainingType.setPrice(trainingTypePojo.getPrice());
        existingTrainingType.setDescription(trainingTypePojo.getDescription());
        existingTrainingType.setCategory(trainingTypePojo.getCategory());  // Update category
        TrainingType updatedTrainingType = trainingTypeRepository.save(existingTrainingType);
        return convertToPojo(updatedTrainingType);
    }

    @Override
    public void deleteTrainingType(Long id) {
        if (trainingTypeRepository.existsById(id)) {
            trainingTypeRepository.deleteById(id);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Training type not found with id: " + id);
        }
    }

    @Override
    public TrainingTypePojo getTrainingTypeById(Long id) {
        return trainingTypeRepository.findById(id)
            .map(this::convertToPojo)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Training type not found with id: " + id));
    }

    @Override
    public List<TrainingTypePojo> getAllTrainingTypes() {
        return trainingTypeRepository.findAll().stream()
            .map(this::convertToPojo)
            .collect(Collectors.toList());
    }

    @Override
    public List<TrainingTypePojo> getTrainingTypesByCategory(String category) {
        return trainingTypeRepository.findByCategory(category).stream()
            .map(this::convertToPojo)
            .collect(Collectors.toList());
    }

    private TrainingTypePojo convertToPojo(TrainingType trainingType) {
        return new TrainingTypePojo(
            trainingType.getId(),
            trainingType.getType(),
            trainingType.getPrice(),
            trainingType.getDescription(),
            trainingType.getCategory()  // Include category
        );
    }
}
