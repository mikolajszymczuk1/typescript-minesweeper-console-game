import Game from "./game/Game";
import levels from "./data";
const prompt = require("prompt-sync")();

function intro(): void {
    console.log(`
█▀▄▀█ █ █▄░█ █▀▀ █▀ █░█░█ █▀▀ █▀▀ █▀█ █▀▀ █▀█
█░▀░█ █ █░▀█ ██▄ ▄█ ▀▄▀▄▀ ██▄ ██▄ █▀▀ ██▄ █▀▄

█▀▄▀█ ▄▀█ █▀▄ █▀▀   █▄▄ █▄█  
█░▀░█ █▀█ █▄▀ ██▄   █▄█ ░█░  

█▀▄▀█ █ █▄▀ █▀█ █░░ ▄▀█ ░░█   █▀ ▀█ █▄█ █▀▄▀█ █▀▀ ▀█ █░█ █▄▀
█░▀░█ █ █░█ █▄█ █▄▄ █▀█ █▄█   ▄█ █▄ ░█░ █░▀░█ █▄▄ █▄ █▄█ █░█
    `);
}

function createGame(): Game {
    let difficult = prompt("Select the difficulty level: (1: easy, 2: medium, 3: hard): ");
    let cd;  // Current Difficult

    switch(difficult) {
        case "1":
            cd = levels["easy"];
            break;

        case "2":
            cd = levels["medium"];
            break;

        case "3":
            cd = levels["hard"];
            break;

        default:
            cd = levels["easy"];
            break;
    }

    return new Game(cd.size.width, cd.size.height, cd.minesCount);
}

function main(): void {
    intro();
    const game: Game = createGame();
    game.loop();
}

main();
