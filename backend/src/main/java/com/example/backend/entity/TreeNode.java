package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.javers.core.metamodel.annotation.DiffIgnore;
import org.javers.core.metamodel.annotation.Id;
import org.javers.core.metamodel.annotation.TypeName;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@TypeName("TreeNode")
@Getter
@Setter
@ToString
public class TreeNode implements Serializable {
    @Id
    private int nodeId;
    @DiffIgnore
    private int treeId;
    private String name;
    @DiffIgnore
    private List<Integer> parentId;
    private List<TreeNode> children;
    @DiffIgnore
    @JsonIgnore
    private List<TreeNode> parents;
    public TreeNode() {
        this.parentId = new ArrayList<>();
        this.children = new ArrayList<>();
        this.parents = new ArrayList<>();
    }

    public void addChild(TreeNode child) {
        if (this.children!= null && !this.children.contains(child) && child != null)
            this.children.add(child);
    }

    public void addParent(TreeNode parent) {
        if (this.parents!= null && !this.parents.contains(parent) && parent != null)
            this.parents.add(parent);
    }


}
