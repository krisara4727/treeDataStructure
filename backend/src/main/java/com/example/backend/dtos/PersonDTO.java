package com.example.backend.dtos;

import com.example.backend.entity.Person;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonDTO {
    private Long id;
    private String fullName;
    private Number age;
    private String parentId;
    private ArrayList<Person> children;
}
