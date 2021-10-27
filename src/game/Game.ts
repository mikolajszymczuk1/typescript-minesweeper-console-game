import Board from "./Board";
const prompt = require("prompt-sync")();

export default class Game {
    width: number;
    height: number;
    minesCount: number;
    board: Board;
    gameLoop: boolean;

    constructor(width: number, height: number, minesCount: number) {
        this.width = width;
        this.height = height;
        this.minesCount = minesCount;

        this.board = new Board(this.width, this.height);
        this.board.createBoard();
        this.board.addMines(this.minesCount);
        this.board.configureFields();
        this.gameLoop = true;

    }

    renderMenu(): void {
        console.log(`
    What you want to do:
    1) Put up / take the flag
    2) Discover field
    3) Exit game
        `);
    }

    loop(): void {
        while (this.gameLoop) {
            this.board.render();
            this.renderMenu();
            let choice = prompt("Your choice: ");

            switch(choice) {
                case "1":
                    this.discoverFlagAction(true);
                    break;

                case "2":
                    this.discoverFlagAction();
                    break;

                case "3":
                    this.gameLoop = false;
                    break;
            }
        }
    }

    discoverFlagAction(flagMode: boolean = false): void {
        let row = parseInt(prompt("Enter the row number: ")) - 1;
        let col = parseInt(prompt("Enter the column number: ")) - 1;

        if (row >= 0 && row <= this.height && col >= 0 && col <= this.width) {
            if (!flagMode) {
                this.board.discoverField(row, col);
            } else {
                this.board.flagField(row, col);
            }
        
            // Check if win or lose
            if (this.board.isLose(row, col)) {
                this.board.render();
                console.log("Game Over !!!");
                this.gameLoop = false;
            }
    
            if (this.board.isWin()) {
                console.log("Victory !!!");
                this.gameLoop = false;
            }
        }
    }
}
