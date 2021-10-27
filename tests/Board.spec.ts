import Board from "../src/game/Board";
import Field from "../src/game/Field";

describe("Board class", (): void => {
    describe("Basic tests", (): void => {
        it("Should be instance of Board and has correct properites", (): void => {
            let board: Board = new Board(10, 10);
            expect(board).toBeInstanceOf(Board);
            expect(board.width).toBe(10);
            expect(board.height).toBe(10);
            expect(board.fields).toStrictEqual([]);
        });
    });

    describe("Methods test", (): void => {
        describe("void methods", (): void => {
            it("createBoard method", (): void => {
                let board: Board = new Board(5, 8);
                board.createBoard();
                expect(board.fields.length).toBe(8);
                board.fields.forEach(el => {
                    expect(el.length).toBe(5);
                });

                for (let y = 0; y < board.height; y++) {
                    for (let x = 0; x < board.width; x++) {
                        expect(board.fields[y][x].value).toBe(0);
                    }
                }
            });

            it("addMines method", (): void => {
                let board: Board = new Board(5, 5);
                board.createBoard();
                board.addMines(10);
                let count: number = 0;

                for (let y = 0; y < board.height; y++) {
                    for (let x = 0; x < board.width; x++) {
                        if (board.fields[y][x].value === -1) count++;
                    }
                }

                expect(count).toBe(10);
            });
            
            it("configureFields method", (): void => {
                let board: Board = new Board(8, 8);
                board.createBoard();
                board.addMines(10);
                board.configureFields();

                for (let y = 0; y < board.height; y++) {
                    for (let x = 0; x < board.width; x++) {
                        let currentField: Field = board.fields[y][x];
                        if (currentField.value !== -1) {
                            let minesAround: number = 0;
                            board.getNeighbors(y, x).forEach((el) => {
                                if (board.fields[el[0]][el[1]].value === -1) {
                                    minesAround++;
                                }
                            });
        
                            expect(currentField.value).toBe(minesAround);
                        }
                    }
                }
            });
            
            it("discoverField method", (): void => {
                let board: Board = new Board(8, 8);
                board.createBoard();
                expect(board.fields[0][0].isDiscover).toBeFalsy();
                board.discoverField(1, 1);
                expect(board.fields[0][0].isDiscover).toBeTruthy();

                board.discoverField(2, 2);
                board.getNeighbors(1, 1).forEach((el) => {
                    expect(board.fields[el[0]][el[1]].isDiscover).toBeTruthy();
                });
            });
            
            it("flagField method", (): void => {
                let board: Board = new Board(8, 8);
                board.createBoard();
                board.flagField(0, 0);
                expect(board.fields[0][0].isFlagged).toBeTruthy();
            });
        });

        describe("return methods", (): void => {
            it("getNeighbors method", (): void => {
                let board: Board = new Board(8, 8);
                board.createBoard();
                expect(board.getNeighbors(0, 0)).toStrictEqual([
                    [0, 1],
                    [1, 0],
                    [1, 1]
                ]);
                
                expect(board.getNeighbors(1, 1)).toStrictEqual([
                    [0, 0],
                    [0, 1],
                    [0, 2],
                    [1, 0],
                    [1, 2],
                    [2, 0],
                    [2, 1],
                    [2, 2]
                ]);
            });

            it("isWin method", (): void => {
                let board: Board = new Board(2, 1);
                board.createBoard();
                board.fields[0][0].value = 1;
                board.fields[0][1].value = -1;
                expect(board.isWin()).toBeFalsy();
                board.discoverField(0, 0);
                expect(board.isWin()).toBeFalsy();
                board.flagField(0, 1);
                expect(board.isWin()).toBeTruthy();
            });
    
            it("isLose method", (): void => {
                let board: Board = new Board(8, 8);
                board.createBoard();
                board.fields[1][1].value = -1;
                expect(board.isLose(0, 0)).toBeFalsy();
                expect(board.isLose(1, 1)).toBeTruthy();
            });
        });
    });
});
