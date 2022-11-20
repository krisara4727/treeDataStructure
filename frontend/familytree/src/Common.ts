const color: any = {
  1: "primary",
  2: "success",
  3: "secondary",
  4: "action",
  5: "disabled",
  6: "primary",
  0: "secondary",
};

export const randomColor = () => {
  return color[Math.floor(Math.random() * 6)];
};
