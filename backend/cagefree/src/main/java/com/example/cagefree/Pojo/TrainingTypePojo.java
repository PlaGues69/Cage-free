package com.example.cagefree.Pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrainingTypePojo {

    private Long id;
    private String type;
    private Double price;
    private String description;
    private String category;  // New field
}
