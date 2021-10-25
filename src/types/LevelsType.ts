export default interface LevelsType {
    [name: string]: {
        size: {
            width: number,
            height: number
        },
        minesCount: number
    }
}
