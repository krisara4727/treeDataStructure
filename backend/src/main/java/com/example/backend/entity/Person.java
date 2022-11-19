package com.example.backend.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Data
//@Entity
@Document(collection = "Person")
public class Person {
    @Id
    private String id;
    private String fullName;
    private Number age;
    private String parentId;
    private ArrayList<Person> children;

    public ArrayList<Person> getChildren() {
        return children;
    }


}
