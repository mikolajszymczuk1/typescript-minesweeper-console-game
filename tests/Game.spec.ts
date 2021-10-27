import Game from "../src/game/Game";
import Board from "../src/game/Board";

describe("Game class", (): void => {
    it("Should has correct properties", (): void => {
        let game: Game = new Game(8, 8, 10);
        expect(game).toBeInstanceOf(Game);
        expect(game.width).toBe(8);
        expect(game.height).toBe(8);
        expect(game.minesCount).toBe(10);
        expect(game.board).toBeInstanceOf(Board);
        expect(game.gameLoop).toBeTruthy;
    });
});
