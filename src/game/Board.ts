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

    createBoard(): void {
        for (let y = 0; y < this.height; y++) {
            this.fields[y] = [];
            for (let x = 0; x < this.width; x++) {
                this.fields[y][x] = new Field(0);
            }
        }
    }

    addMines(minesCount: number): void {
        let count: number = 0;
        while (count !== minesCount) {
            let randomY: number = randomNumber(0, this.height);
            let randomX: number = randomNumber(0, this.width);
            
            if (this.fields[randomY][randomX].value !== -1) {
                this.fields[randomY][randomX].value = -1;
                count++;   
            }
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

        return neighbors.filter(el => el[0] >= 0 && el[0] < this.height && el[1] >= 0 && el[1] < this.width);
    }

    configureFields(): void {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let currentField: Field = this.fields[y][x];
                if (currentField.value !== -1) {
                    let minesAround: number = 0;
                    this.getNeighbors(y, x).forEach((el) => {
                        if (this.fields[el[0]][el[1]].value === -1) {
                            minesAround++;
                        }
                    });

                    currentField.value = minesAround;
                }
            }
        }
    }

    render(): void {
        console.clear();  // Clear console before each render

        let rowNumber: string = "";
        for (let i = 0; i < this.width; i++) {
            if (i == 0) {
                rowNumber += `   ${ i + 1 }`;
            } else if (i + 1 < 10) {
                rowNumber += `  ${ i  + 1 }`;
            } else {
                rowNumber += ` ${ i  + 1 }`;
            }

        }
        console.log(rowNumber);

        for (let y = 0; y < this.height; y++) {
            let row: string;

            if (y + 1 < 10) {
                row = `${ y + 1 } `;
            } else {
                row = `${ y + 1 }`;
            }

            for (let x = 0; x < this.width; x++) {
                let currentField: Field = this.fields[y][x];

                if (currentField.isFlagged) {
                    row += "[F]";
                    continue;
                }
                
                if (!currentField.isDiscover) {
                    row += "[ ]";
                    continue;
                }

                if (currentField.value === -1) {
                    row += "[*]";
                } else if (currentField.value === 0) {
                    row += "[+]";
                } else {
                    row += `[${ currentField.value }]`;
                }
            }

            console.log(row);
        }
    }

    discoverField(row: number, column: number): void {
        this.fields[row][column].discover();

        if (this.fields[row][column].value === 0 && this.fields[row][column].isDiscover) {
            this.getNeighbors(row, column).forEach((el) => {
                this.fields[el[0]][el[1]].discover();
            });
        }
    }

    flagField(row: number, column: number): void {
        this.fields[row][column].flag();
    }

    isWin(): boolean {
        for (let y = 0; y < this.height; y++) {
            for(let x = 0; x < this.width; x++) {
                let currentField: Field = this.fields[y][x];
                if ((!currentField.isDiscover && currentField.value !== -1) ||
                    (currentField.value === -1 && !currentField.isFlagged)) {
                    return false;
                }
            }
        }

        return true;
    }

    isLose(row: number, column: number): boolean {
        if (this.fields[row][column].value === -1 && !this.fields[row][column].isFlagged) {
            this.fields[row][column].discover();
            return true;
        }

        return false;
    }
}
