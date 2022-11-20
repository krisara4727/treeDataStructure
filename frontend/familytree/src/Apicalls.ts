import axios from "axios";

export const url: string = "http://localhost:8080/app";

export const getAll = async () => {
  return await axios.get(url + "/trees");
};

export const getById = async (id: number) => {
  return await axios.get(url + "/" + id);
};

export const getByTwoId = async (treeId: number, nodeId: number) => {
  const result = await axios.get(url + treeId + "/st" + nodeId);
  console.log(result);
};

export const createTreeOrNode = async () => {
  const result = await axios.post(url);
  console.log(result);
};
