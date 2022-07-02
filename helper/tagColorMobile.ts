import Difficulty from "../src/enum/difficulty";
import MobileTagElement from "../src/enum/mobileTagElement";

const TagColorMobile = (difficulty: number) => {
  switch (difficulty) {
    case Difficulty.Easy:
      return {
        Name: "E",
        TextColor: "#044317",
        BackgroundColor: "#a7f0ba",
      } as MobileTagElement;
    case Difficulty.Medium:
      return {
        Name: "M",
        TextColor: "#002d9c",
        BackgroundColor: "#d0e2ff",
      } as MobileTagElement;
    case Difficulty.Hard:
      return {
        Name: "H",
        TextColor: "#740937",
        BackgroundColor: "#ffd6e8",
      } as MobileTagElement;
    default:
      return {
        Name: "N",
        TextColor: "#a8a8a8",
        BackgroundColor: "#3b3b3b",
      } as MobileTagElement;
  }
};

export default TagColorMobile;
