import { create } from "@mui/material/styles/createTransitions";
import React, { useEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";
import { useParams } from "react-router-dom";
import { getById } from "./Apicalls";

function TreeStructure() {
  const { id } = useParams();
  const [tree, settree] = useState<any>(null);
  const parent = useRef(null);
  const nestedArray: any[] = [];
  useEffect(() => {
    async function getTreeById() {
      const result: any = await getById(Number(id));
      result.status === 200 && settree(result.data);
      console.log(result);
    }
    getTreeById();
  }, [id]);

  const createTree = (ele: any, parent: any, nestedArray: any) => {
    const nodeParent = document.createElement("div");
    nodeParent.style.display = "flex";
    nodeParent.style.justifyContent = "center";
    nodeParent.style.margin = "0 16px";
    for (let i = 0; i < ele.length; i++) {
      const createNode = document.createElement("div");
      const text = document.createElement("p");
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

  return (
    <div className="w-screen h-screen text-slate-100 p-4 ">
      <button
        onClick={() =>
          tree &&
          createTree(
            tree.children,
            document.getElementById("container"),
            nestedArray
          )
        }
        className="text-black"
      >
        get Tree
      </button>
      <div ref={parent} className="w-full  text-black" id="container">
        <p className="max-w-content p-4 border-2 rounded-full text-center">
          {tree && tree?.name}
        </p>
      </div>
      {/* <>{tree && createTree(tree.children, parent)}</> */}
      {/* {tree && <Tree data={tree} />} */}
    </div>
  );
}

export default TreeStructure;
