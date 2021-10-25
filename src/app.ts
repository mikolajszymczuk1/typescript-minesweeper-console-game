import Board from "./game/Board";

const board: Board = new Board(8, 8);
board.createBoard();
board.addMines(10);
board.configureFields();
board.render();
