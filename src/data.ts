import LevelsType from "./types/LevelsType";

export default <LevelsType> {
    easy: {
        size: {
            width: 8,
            height: 8
        },
        minesCount: 10
    },
    medium: {
        size: {
            width: 16,
            height: 16
        },
        minesCount: 40
    },
    hard: {
        size: {
            width: 30,
            height: 16
        },
        minesCount: 99
    },
}
