// layout utils. abstract to other file later when doing theming
export const cellWidth = 100;
export const cellMargin = 8;
export const getCardWidth = numCells =>
  numCells * cellWidth + (numCells - 2) * cellMargin;

export default {
  getCardWidth,
};
