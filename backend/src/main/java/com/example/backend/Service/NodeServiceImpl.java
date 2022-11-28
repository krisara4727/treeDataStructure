package com.example.backend.Service;

import com.example.backend.Exception.NotFoundException;
import com.example.backend.Repository.NodeRepository;
import com.example.backend.entity.Node;
import com.example.backend.entity.TreeNode;
import lombok.extern.java.Log;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Log
@Service
public class NodeServiceImpl implements NodeService {
    @Autowired
    private final NodeRepository nodeRepository;

    public NodeServiceImpl(NodeRepository nodeRepository) {
        this.nodeRepository = nodeRepository;
    }

    @Override
    public TreeNode getFullTree(int treeId) {
        List<Node> nodes = nodeRepository.findDistinctByTreeId(treeId).orElseThrow(NotFoundException::new);
        List<TreeNode> treeNodes = new ArrayList<>();
        Integer rootNode = 0 ;
        for (Node node : nodes) {
            TreeNode treeNode = new TreeNode();
            if(node.getName().equals("root")) {
                rootNode = node.getNodeId();
            }
            BeanUtils.copyProperties(node, treeNode, "id", "children");
            treeNodes.add(treeNode);
        }

        return NodeService.assembleTree(treeNodes, rootNode);
    }

    @Override
//    @Transactional(readOnly = true)
    public TreeNode getSubTree(int treeId, int nodeId, Long maxDepth) {
        List<Node> nodes = nodeRepository.getSubTree(treeId, nodeId, null).orElseThrow(NotFoundException::new);

        List<TreeNode> flatList = nodes.stream()
                .map(Node::getDescendants)
                .flatMap(Collection::stream)
                .map(node -> {
                    TreeNode tr = new TreeNode();
                    BeanUtils.copyProperties(node, tr, "id");
                    return tr;
                })
                .collect(Collectors.toList());

        TreeNode root = new TreeNode();
        BeanUtils.copyProperties(nodes.get(0), root, "id", "children");
        flatList.add(root);
        System.out.println("printing sub tree "+ nodes + " flat List " + flatList);
        return (NodeService.assembleTree(flatList, nodeId));
    }

    @Override
//    @Transactional(rollbackFor = Exception.class)
    public void deleteNodes(int treeId, int nodeId)  {
        // ... perform validations etc.
        List<Node> nodes = nodeRepository.getSubTree(treeId, nodeId, 1L).orElseThrow(NotFoundException::new);
        var target = nodes.get(0);
        if (!CollectionUtils.isEmpty(target.getDescendants())) {
            target.getDescendants().forEach(n -> n.setParentId(target.getParentId()));
            nodeRepository.saveAll(target.getDescendants());
        }

        nodeRepository.delete(target);
    }

    @Override
    //@Transactional(rollbackFor = Exception.class)
    public Node create(TreeNode treeNode) {
        // ... check if parent exists etc.
        Node node = new Node();
        if(treeNode.getName().equals("root")){
            node.setTreeId(new Random().nextInt(100000));
        }else {
            node.setTreeId(treeNode.getTreeId());
        }
        node.setParentId(treeNode.getParentId());
        node.setName(treeNode.getName());
        node.setNodeId(new Random().nextInt(100000)); // set a unique nodeId based on your policy

        nodeRepository.save(node);
        return node;
        // iterate children and persist them as well...
    }

    @Override
    public List<Integer> getAllTrees() {
        List<Node> nodes = nodeRepository.findAll();
        List<Node> roots = new ArrayList<>();
        for(Node node: nodes) {
            if(node.getName().equals("root")) {
                roots.add(node);
            }
        }
        List<Integer> trees = new ArrayList<>();
        for (Node root : roots) {
            int treeId = root.getTreeId();
            trees.add(treeId);
        }
        return trees;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void move(int treeId, int nodeId, int newParentNodeId) {
        // ... perform validations etc.
        var node = nodeRepository.findDistinctByTreeIdAndNodeId(treeId, nodeId).orElseThrow(NotFoundException::new);
        node.setParentId(List.of(newParentNodeId));
        nodeRepository.save(node);
    }

}
