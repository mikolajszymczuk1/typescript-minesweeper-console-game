import Field from "./Field";
import { randomNumber } from "../utilities/helpers";

export default class Board {
    width: number;
    height: number;
    fields: Field[][];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.fields = [];
    }

    createBoard() {
        for (let y = 0; y < this.height; y++) {
            this.fields[y] = [];
            for (let x = 0; x < this.width; x++) {
                this.fields[y][x] = new Field(0);
            }
        }
    }

    addMines(minesCount: number) {
        for (let i = 0; i < minesCount + 1; i++) {
            let randomY: number = randomNumber(0, this.height);
            let randomX: number = randomNumber(0, this.width);
            this.fields[randomY][randomX].value = -1;
        }
    }

    getNeighbors(y: number, x: number): number[][] {
        let neighbors: number[][] = [
            [y - 1, x - 1],     // top left
            [y - 1, x],         // top
            [y - 1, x + 1],     // top right
            [y, x - 1],         // left
            [y, x + 1],         // right
            [y + 1, x - 1],     // bottom left
            [y + 1, x],         // bottom
            [y + 1, x + 1]      // bottom right
        ];

        return neighbors.filter(el => el[0] > 0 && el[0] < this.height && el[1] > 0 && el[1] < this.width);
    }

    configureFields() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.fields[y][x].value !== -1 && this.fields[y][x].value !== -2) {
                    let minesAround: number = 0;
                    this.getNeighbors(y, x).forEach((el) => {
                        if (this.fields[el[0]][el[1]].value === -1) {
                            minesAround++;
                        }
                    });

                    this.fields[y][x].value = minesAround;
                }
            }
        }
    }

    render() {
        console.clear();  // Clear console before each render

        for (let y = 0; y < this.height; y++) {
            let row: string = "";
            for (let x = 0; x < this.width; x++) {
                let currentFieldValue: number = this.fields[y][x].value;
                if (currentFieldValue === -1) {
                    row += "[*]";
                } else if (currentFieldValue === -2) {
                    row += "[F]";
                } else {
                    row += `[${ this.fields[y][x].value }]`;
                }
            }

            console.log(row);
        }
    }
}
