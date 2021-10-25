export default class Field {
    public value: number;
    public isDiscover: boolean;

    constructor(value: number) {
        this.value = value;
        this.isDiscover = false;
    }

    discover(): void {
        this.isDiscover = true;
    }
}
