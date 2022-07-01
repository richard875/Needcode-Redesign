import Difficulty from "../src/enum/difficulty";

const FontaewsomeColor = (difficulty: number) => {
  switch (difficulty) {
    case Difficulty.Easy:
      return "rgb(34 197 94)";
    case Difficulty.Medium:
      return "rgb(59 130 246)";
    case Difficulty.Hard:
      return "rgb(244 63 94)";
    default:
      return "rgb(100 116 139)";
  }
};

export default FontaewsomeColor;
