package com.example.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "nodes")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Node {
    @Id
    private String id;

    private int nodeId;

    private int treeId;

    private List<Integer> parentId;

    private String name;

    private  List<Node> descendants;




}
