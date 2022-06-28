import Difficulty from "../src/enum/difficulty";

const TagColor = (difficulty: number) => {
  switch (difficulty) {
    case Difficulty.Easy:
      return "green";
    case Difficulty.Medium:
      return "blue";
    case Difficulty.Hard:
      return "magenta";
    default:
      return "gray";
  }
};

export default TagColor;

// Available colors:
// red
// magenta
// purple
// blue
// cyan
// teal
// green
// gray
// cool-gray
// warm-gray
