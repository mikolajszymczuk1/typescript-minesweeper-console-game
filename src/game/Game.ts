import Board from "./Board";

export default class Game {
    board: Board;

    constructor(width: number, height: number, minesCount: number) {
        this.board = new Board(width, height);
        this.board.createBoard();
        this.board.addMines(minesCount);
        this.board.configureFields();
        this.board.render();
    }
}
