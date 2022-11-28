import { Button } from "@mui/material";
import React, { useState } from "react";
import { createTreeOrNode, deleteNode } from "./Apicalls";

function NewNode(props: any) {
  const { parentDetails, setopenModal, getTreeById, setparentDetails } = props;
  const nodeId = parentDetails.parentId;
  const [name, setname] = useState<string>("");
  const body: any = document.querySelector("body");
  const [options, setoptions] = useState({
    addChild: false,
    deleteChild: false,
    viewSubtree: false,
  });
  const [currentTab, setcurrentTab] = useState("Details");

  body.style.overflow = "hidden";
  const closeModal = () => {
    body.style.overflow = "auto";
    setopenModal();
  };
  const handleSave = async () => {
    const result: any = await createTreeOrNode({
      name: name,
      treeId: parentDetails.treeId,
      parentId: [nodeId],
    });
    console.log("parentId create ode and tree", result);
    if (result.status === 200) {
      //getTreeById(parentDetails.treeId);
      setopenModal(false);
      window.location.reload();
    }
  };
  async function handleDeleteNode() {
    const result: any = await deleteNode(
      parentDetails.treeId,
      parentDetails.parentId
    );
    console.log("parentId deleting", result);

    if (result.status === 204) {
      setopenModal(false);
      window.location.reload();
    }
  }
  return (
    <div className="flex justify-center items-center fixed top-0 left-0 w-screen h-screen modalblur">
      <div className="absolute md:w-1/2 bg-white text-black modal p-4 flex flex-col gap-4">
        <div className="flex items-center mb-3">
          <p className="flex-1 font-bold text-lg text-center">
            <span className="text-purple-700 capitalize">
              {parentDetails.name}'s
            </span>{" "}
            Details
          </p>
          <p
            onClick={() => closeModal()}
            className="p-2 bg-pink-400 rounded-full cursor-pointer"
          >
            X
          </p>
        </div>
        <div className="flex gap-4 justify-center mb-4">
          <Button
            variant="contained"
            color="success"
            style={{ display: "inline-block" }}
            onClick={() => setcurrentTab("AddChild")}
          >
            Add child
          </Button>

          <Button
            variant="outlined"
            color="error"
            onClick={() => setcurrentTab("DeleteChild")}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setcurrentTab("SubTree")}
          >
            Sub Tree
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setcurrentTab("Details")}
          >
            Details
          </Button>
        </div>
        {currentTab === "AddChild" && (
          <>
            <div className="flex w-full px-4 items-center">
              <p>Child Name:</p>
              <input
                onChange={(e) => setname(e.target.value)}
                value={name}
                className="ml-2 flex-1 border border-zinc-800 rounded p-1"
              ></input>
            </div>
            <div className="flex w-full px-4 items-center">
              <p>Child Image:</p>
              <input
                // onChange={(e) => setname(e.target.value)}
                // value={name}
                type="file"
                disabled={true}
                className="ml-2 flex-1 border border-zinc-800 rounded p-1"
              ></input>
            </div>
            <div className="flex justify-end gap-2 mt-3">
              <Button
                type="submit"
                variant="contained"
                onClick={() => handleSave()}
              >
                Save
              </Button>
              <Button variant="outlined" onClick={() => setopenModal(false)}>
                Cancel
              </Button>
            </div>
          </>
        )}
        {currentTab === "Details" && (
          <ul className="flex justify-center flex-col">
            <li className="flex p-2 bg-pink-200 rounded w-full justify-center mb-2">
              <p className="mr-4">Name:</p>
              <p className="font-semibold">{parentDetails.name}</p>
            </li>
            <li className="flex p-2 bg-pink-200 rounded w-full justify-center mb-2">
              <p className="mr-4">Blood Group:</p>
              <p className="font-semibold">O positive</p>
            </li>
            <li className="flex p-2 bg-pink-200 rounded w-full justify-center mb-2">
              <p className="mr-4">Education Details:</p>
              <p className="font-semibold">graduated from IIT</p>
            </li>
          </ul>
        )}
        {currentTab === "DeleteChild" && (
          <div className="flex flex-col items-center w-1/2 mx-auto border-zinc-800 border rounded">
            <div className="w-full h-2 rounded-t bg-red-500"></div>
            <p className="p-4">
              Are you sure you want to delete{" "}
              <span className="text-purple-700 capitalize">
                {parentDetails.name}
              </span>
            </p>
            <div className="flex justify-end gap-4 mb-2">
              <Button color="success" variant="outlined">
                No
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={() => handleDeleteNode()}
              >
                Yes
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewNode;
