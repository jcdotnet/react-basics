export type CellValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type CellPosition = [number, number];

export type GameCell = {
    value: CellValue, // 0 empty, 1-8 adjacent mines, 9 mine 
    flagged: boolean,
    opened: boolean,
    cssClass?: string // maybe not needed
}
export type GameGrid = GameCell[][];

export type GameMode = 'easy' | 'medium' | 'expert'
export type GameStatus = 'initial' | 'ongoing' | 'won' | 'over' 

export type Game = {
    flags: number,
    grid: GameGrid,
    mode: GameMode,
    status: GameStatus;
}