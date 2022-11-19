package com.example.backend.Controller;

import com.example.backend.Service.NodeService;
import com.example.backend.entity.Node;
import com.example.backend.entity.TreeNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class NodeController {
    @Autowired
    NodeService nodeService;

    @GetMapping(value = "/app/{treeId}")
    public ResponseEntity<TreeNode> getFullTree(@PathVariable("treeId") int treeId) {
        return ResponseEntity.ok(nodeService.getFullTree(treeId));
    }

    @GetMapping(value = "/app/{treeId}/st/{nodeId}")
    public ResponseEntity<TreeNode> getSubtree(@PathVariable("treeId") int treeId, @PathVariable("nodeId") int nodeId) {
        return ResponseEntity.ok(nodeService.getSubTree(treeId, nodeId, null));
    }

    @GetMapping(value= "/app/trees")
    public ResponseEntity<List<Integer>> getAllTrees(){
        return ResponseEntity.ok(nodeService.getAllTrees());
    }

    @DeleteMapping(value = "/app/{treeId}/{nodeId}")
    public ResponseEntity<Void> deleteNodes(@PathVariable("treeId") int treeId, @PathVariable("nodeId") int nodeId) {
        nodeService.deleteNodes(treeId, nodeId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(value = "/app/")
    public ResponseEntity<Node> create(@RequestBody TreeNode treeNode) {
        return ResponseEntity.ok(nodeService.create(treeNode));
    }

    @PutMapping(value = "/app/{treeId}/{nodeId}")
    public ResponseEntity<Void> move(@PathVariable("treeId") int treeId, @PathVariable("nodeId") int nodeId,
                                     @RequestParam int newParentNodeId) {
        nodeService.move(treeId, nodeId , newParentNodeId);
        return ResponseEntity.ok().build();
    }
}
