import { Add } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAll, url } from "./Apicalls";
import Card from "./Card";

function Homepage() {
  const navigate = useNavigate();
  const [trees, settrees] = useState<Number[]>([]);

  const handleTreeClick = (item: any) => {
    navigate("/trees/" + item);
  };
  useEffect(() => {
    async function getallTrees() {
      const result: any = await getAll();
      if (result.status === 200) settrees(result.data);
    }
    getallTrees();
  }, []);

  return (
    <div className="w-screen h-screen bg-dark text-slate-100 p-4 ">
      <div className="px-4 py-2 bg-black mb-4  flex items-center">
        <p className="flex-1 font-bold">TreeData View</p>
        <span className="cursor-pointer">
          Create Tree <Add />
        </span>
      </div>
      <div className="flex flex-wrap grow md:flex-row items-center md:justify-center gap-2 overflow-y-auto">
        {trees &&
          trees.length &&
          trees.map((item, index) => {
            return (
              <Card key={index} id={item} handleTreeClick={handleTreeClick} />
            );
          })}
      </div>
    </div>
  );
}

export default Homepage;
