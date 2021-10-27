import Field from "../src/game/Field";

describe("Field class", (): void => {
    describe("Basic tests", (): void => {
        it("New object should be instance of Field", (): void => {
            let field: Field = new Field(0);
            expect(field).toBeInstanceOf(Field);
        });
    
        it("After create Field objecy should has default properties", (): void => {
            let field: Field = new Field(0);
            expect(field.value).toBe(0);
            expect(field.isDiscover).toBeFalsy();
            expect(field.isFlagged).toBeFalsy();
        });
    });

    describe("Methods", (): void => {
        it("discover method", (): void => {
            let field: Field = new Field(0);
            field.discover();
            expect(field.isDiscover).toBeTruthy();
            field.isDiscover = false;
            field.flag();
            field.discover();
            expect(field.isDiscover).toBeFalsy();
        });
    
        it("flag method", (): void => {
            let field: Field = new Field(0);
            field.flag();
            expect(field.isFlagged).toBeTruthy();
            field.isFlagged = false;
            field.discover();
            field.flag();
            expect(field.isFlagged).toBeFalsy();
            field.isDiscover = false;
            field.isFlagged = true;
            field.flag();
            expect(field.isFlagged).toBeFalsy();
        });
    });
});
