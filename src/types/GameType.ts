import { CardType } from "./Card";
import { UserType } from "./User";


export type GameType = {
    players: UserType[];
    currentPlayer: UserType;
    cards: CardType[];
    foundedCards: CardType[];
    closed: boolean;
    gridSize: number;
};