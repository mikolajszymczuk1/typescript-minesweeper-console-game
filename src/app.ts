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
    let difficult = prompt("Podaj poziom trudności (1: łatwy, 2: średni, 3: trudny): ");
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
}

main();
