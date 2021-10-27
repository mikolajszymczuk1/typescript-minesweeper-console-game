import { randomNumber } from "../src/utilities/helpers";

describe("radnomNumber helper function", (): void => {
    it("Should return random number in range (min, max)", (): void => {
        let min: number = 1;
        let max: number = 4;
        expect(randomNumber(min, max)).toBeGreaterThanOrEqual(min);
        expect(randomNumber(min, max)).toBeLessThan(max);
    });
});
