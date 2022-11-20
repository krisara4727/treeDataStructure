import React from "react";
import ParkIcon from "@mui/icons-material/Park";
import { randomColor } from "./Common";

function Card(props: any) {
  const { id, handleTreeClick } = props;
  return (
    <div
      className="w-40 h-40 bg-divBg rounded-md grow p-2 flex flex-col justify-center items-center"
      onClick={() => handleTreeClick(id)}
    >
      <h3 className="font-medium mb-4">TreeName: {id}</h3>
      <ParkIcon color={randomColor()} fontSize="large" />
    </div>
  );
}

export default Card;
