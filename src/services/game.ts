import { CardType } from "../types/Card";
import { v4 as uuid } from 'uuid'
import { database } from "./firebase";
import { GameType } from "../types/GameType";

export const getCardsAsNumbers = (gridSize: number): CardType[] => {
    const newCards: CardType[] = [];

    const getNewNumber = (seed: number): number => Math.floor(Math.random() * seed);

    for (let i = 0; i < (gridSize * gridSize) / 2; i++) {
        let number = getNewNumber(gridSize * gridSize);
        
        while(newCards.some(c => c.number === number)) number = getNewNumber(gridSize * gridSize);

        const newCard: CardType = { id: '', cardKey: number.toString(), number, active: false, order: -1 };

        newCards.push({ ...newCard, id: uuid() });
        newCards.push({ ...newCard, id: uuid() });
    }

    for (let i = 0; i < newCards.length; i++) {
        const element = newCards[i];

        while (element.order === -1){
            const randomOrder = getNewNumber(gridSize * gridSize);

            if (!newCards.some(c => c.order === randomOrder)) element.order = randomOrder;
        }
    }

    return newCards;
}

export const restartGame = async (gameKey: string, cards: CardType[]): Promise<boolean> => {
    const gameRef = database.ref(`/games/${gameKey}`);
    const gameVal = (await gameRef.get()).val() as GameType;

    if (gameRef && gameVal) {
        gameRef.set({
            ...gameVal,
            cards: [...cards.map(c => ({ ...c, active: false, foundedBy: null}))],
            currentPlayer: { ...gameVal.players[0] },
        } as GameType);

        return true;
    }

    return false;
}

export const createNewGameFromExistent = async (gameKey: string): Promise<string | null> => {
    const gamesRef = database.ref(`/games`); 
    const gameRef = database.ref(`/games/${gameKey}`);
    const gameVal = (await gameRef.get()).val() as GameType;

    if (gameRef && gameVal) {
        const newGame = await gamesRef.push({
            cards: await getCardsAsNumbers(gameVal.gridSize),
            players: [ ...gameVal.players ],
            currentPlayer: { ...gameVal.players[0] },
            gridSize: gameVal.gridSize,
        } as GameType);

        return newGame.key;
    }

    return '';
}