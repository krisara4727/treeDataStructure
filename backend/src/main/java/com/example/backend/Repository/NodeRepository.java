package com.example.backend.Repository;

import com.example.backend.entity.Node;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface NodeRepository extends MongoRepository<Node, Object>, NodeGraphLookupRepository {
    Optional<List<Node>> findDistinctByTreeId(int treeId);
    Optional<Node> findDistinctByTreeIdAndNodeId(int treeId, int nodeId);
}
