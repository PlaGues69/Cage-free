package com.example.cagefree.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.cagefree.Pojo.TrainingTypePojo;
import com.example.cagefree.Service.TrainingTypeService;

@RestController
@RequestMapping("/trainingtypes")
public class TrainingTypeController {

    @Autowired
    private TrainingTypeService trainingTypeService;
    @PostMapping("/save")
    public ResponseEntity<TrainingTypePojo> createTrainingType(@RequestBody TrainingTypePojo trainingTypePojo) {
        TrainingTypePojo createdTrainingType = trainingTypeService.createTrainingType(trainingTypePojo);
        return ResponseEntity.ok(createdTrainingType);
    }
    @GetMapping("/getAll")
    public ResponseEntity<List<TrainingTypePojo>> getAllTrainingTypes() {
        List<TrainingTypePojo> trainingTypes = trainingTypeService.getAllTrainingTypes();
        return ResponseEntity.ok(trainingTypes);
    }
    @GetMapping("/get/{id}")
    public ResponseEntity<TrainingTypePojo> getTrainingTypeById(@PathVariable Long id) {
        TrainingTypePojo trainingTypePojo = trainingTypeService.getTrainingTypeById(id);
        if (trainingTypePojo != null) {
            return ResponseEntity.ok(trainingTypePojo);
        }
        return ResponseEntity.notFound().build();
    }
    @GetMapping("/getByCategory/{category}")
    public ResponseEntity<List<TrainingTypePojo>> getTrainingTypesByCategory(@PathVariable String category) {
        List<TrainingTypePojo> trainingTypes = trainingTypeService.getTrainingTypesByCategory(category);
        return ResponseEntity.ok(trainingTypes);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<TrainingTypePojo> updateTrainingType(@PathVariable Long id, @RequestBody TrainingTypePojo trainingTypePojo) {
        TrainingTypePojo updatedTrainingType = trainingTypeService.updateTrainingType(id, trainingTypePojo);
        if (updatedTrainingType != null) {
            return ResponseEntity.ok(updatedTrainingType);
        }
        return ResponseEntity.notFound().build();
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTrainingType(@PathVariable Long id) {
        try {
            trainingTypeService.deleteTrainingType(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
