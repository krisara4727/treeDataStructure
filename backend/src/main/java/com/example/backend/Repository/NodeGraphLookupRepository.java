package com.example.backend.Repository;

import com.example.backend.entity.Node;

import java.util.List;
import java.util.Optional;

public interface NodeGraphLookupRepository {
    Optional<List<Node>>  getSubTree(int treeId, int nodeId, Long maxDepth);
}
