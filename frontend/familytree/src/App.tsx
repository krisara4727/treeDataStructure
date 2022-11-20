import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./Homepage";
import TreeStructure from "./TreeStructure";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/trees/:id" element={<TreeStructure />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
