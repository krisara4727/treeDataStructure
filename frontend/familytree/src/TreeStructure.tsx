import { Home } from "@mui/icons-material";
import { create } from "@mui/material/styles/createTransitions";
import React, { useEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";
import { useNavigate, useParams } from "react-router-dom";
import { getById } from "./Apicalls";
import NewNode from "./NewNode";

function TreeStructure() {
  const { id } = useParams();
  const [tree, settree] = useState<any>(null);
  const [openModal, setopenModal] = useState<Boolean>(false);
  const [parentDetails, setparentDetails] = useState({});
  const parent = useRef(null);
  const nestedArray: any[] = [];
  const navigate = useNavigate();

  useEffect(() => {
    getTreeById(id);
  }, [id]);

  async function getTreeById(id: any) {
    const result: any = await getById(Number(id));
    result.status === 200 && settree(result.data);
    console.log(result);
  }

  const createTree = (ele: any, parent: any, nestedArray: any) => {
    const nodeParent = document.createElement("div");
    nodeParent.style.display = "flex";
    nodeParent.style.justifyContent = "space-between";
    for (let i = 0; i < ele.length; i++) {
      const createNode = document.createElement("div");
      const text = document.createElement("p");
      text.addEventListener("click", () => {
        addNewNode({
          name: ele[i].name,
          treeId: ele[i].treeId,
          parentId: ele[i].nodeId,
        });
      });
      text.innerHTML = ele[i].name;
      text.style.padding = "16px";
      text.style.width = "100px";
      text.style.height = "100px";
      text.style.textAlign = "center";
      text.style.border = "2px solid black";
      text.style.borderRadius = "100%";
      text.style.margin = "16px auto";
      createNode.style.color = "black";
      createNode.append(text);
      createNode.style.margin = "0 4px";
      nodeParent.appendChild(createNode);
      if (ele[i].children.length) {
        console.log("inside for if condition ", ele[i].children.length);
        text.style.backgroundColor = "pink";
        createTree(ele[i].children, createNode, nestedArray);
      }

      text.style.backgroundColor !== "pink" &&
        (text.style.backgroundColor = "grey");
    }

    parent.append(nodeParent);
    return;
  };

  const addNewNode = (parentObject: any) => {
    console.log("creating new node");
    if (!openModal) {
      setparentDetails(parentObject);
      setopenModal(true);
    }
  };

  return (
    <div className="overflow-auto h-screen text-slate-100">
      <div className="py-2 flex items-center">
        <div className="flex-1 float-left">
          <Home
            color="success"
            fontSize="large"
            onClick={() => navigate("/")}
          />
        </div>
        <button
          onClick={() =>
            tree &&
            createTree(
              tree.children,
              document.getElementById("container"),
              nestedArray
            )
          }
          className="text-white ml-auto bg-blue-900 p-2 rounded-md font-medium"
        >
          View Tree
        </button>
      </div>
      <div
        ref={parent}
        className="overflow-auto text-black cursor-pointer flex flex-col items-center"
        id="container"
      >
        <p
          className="w-24 h-24 flex justify-center items-center font-bold capitalize rounded-full  bg-black text-white"
          onClick={() =>
            addNewNode({
              name: tree.name,
              treeId: tree.treeId,
              parentId: tree.nodeId,
            })
          }
        >
          {tree && tree?.name}
        </p>
      </div>
      {openModal && (
        <NewNode
          parentDetails={parentDetails}
          setopenModal={setopenModal}
          setparentDetails={setparentDetails}
          getTreeById={getTreeById}
        />
      )}
      {/* <>{tree && createTree(tree.children, parent)}</> */}
      {/* {tree && <Tree data={tree} />} */}
    </div>
  );
}

export default TreeStructure;
