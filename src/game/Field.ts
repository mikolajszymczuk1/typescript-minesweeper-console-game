export default class Field {
    public value: number;
    public isDiscover: boolean;
    public isFlagged: boolean;

    constructor(value: number) {
        this.value = value;
        this.isDiscover = false;
        this.isFlagged = false;
    }

    discover(): void {
        this.isDiscover = this.isFlagged ? false : true;
    }

    flag(): void {
        if (!this.isFlagged) {
            this.isFlagged = this.isDiscover ? false : true;
        } else {
            this.isFlagged = false;
        }
    }
}
