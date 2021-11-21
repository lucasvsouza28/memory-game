import { CardType } from "../types/Card";
import { v4 as uuid } from 'uuid'
import { database } from "./firebase";
import { GameType } from "../types/GameType";
import { UserType } from "../types/User";

const getNewNumber = (seed: number): number => Math.floor(Math.random() * seed);

export const getCardsAsNumbers = (gridSize: number): CardType[] => {
    const newCards: CardType[] = [];

    for (let i = 0; i < (gridSize * gridSize) / 2; i++) {
        let number = getNewNumber(gridSize * gridSize);
        
        while(newCards.some(c => c.value === number.toString())) number = getNewNumber(gridSize * gridSize);

        const newCard: CardType = { id: '', cardKey: number.toString(), value: number.toString(), active: false, order: -1 };

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

export const getCardsAsIcons = (gridSize: number): CardType[] => {
    const icons = [
        'Gi3DGlasses',
        'Gi3DHammer',
        'Gi3DMeeple',
        'Gi3DStairs',
        'GiAbacus',
        'GiAbbotMeeple',
        'GiAbdominalArmor',
        'GiAbstract001',
        'GiAbstract002',
        'GiAbstract003',
        'GiAbstract004',
        'GiAbstract005',
        'GiAbstract006',
        'GiAbstract007',
        'GiAbstract008',
        'GiAbstract009',
        'GiAbstract010',
        'GiAbstract011',
        'GiAbstract012',
        'GiAbstract013',
        'GiAbstract014',
        'GiAbstract015',
        'GiAbstract016',
        'GiAbstract017',
        'GiAbstract018',
        'GiAbstract019',
        'GiAbstract020',
        'GiAbstract021',
        'GiAbstract022',
        'GiAbstract023',
        'GiAbstract024',
        'GiAbstract025',
        'GiAbstract026',
        'GiAbstract027',
        'GiAbstract028',
        'GiAbstract029',
    ];
    const newCards: CardType[] = [];

    for (let i = 0; i < (gridSize * gridSize) / 2; i++) {
        let number = getNewNumber(gridSize * gridSize);
        let icon = icons[number];
        
        while(newCards.some(c => c.value === icon)){
            number = getNewNumber(gridSize * gridSize);
            icon = icons[number];
        }

        const newCard: CardType = { id: '', cardKey: number.toString(), value: icon, active: false, order: -1 };

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

export const createGameFromExistent = async (gameKey: string): Promise<string | null> => {
    const gamesRef = database.ref(`/games`); 
    const gameRef = database.ref(`/games/${gameKey}`);
    const gameVal = (await gameRef.get()).val() as GameType;

    if (gameRef && gameVal) {
        const newGame = await gamesRef.push({
            theme: gameVal.theme,
            cards: gameVal.theme === 'Numbers' ? await getCardsAsNumbers(gameVal.gridSize) : await getCardsAsIcons(gameVal.gridSize),
            players: [ ...gameVal.players ],
            currentPlayer: { ...gameVal.players[0] },
            gridSize: gameVal.gridSize,
            playersCount: gameVal.playersCount,
        } as GameType);

        return newGame.key;
    }

    return '';
}

export const createGame = async (theme: 'Numbers' | 'Icons', gridSize: number, playersCount: number, user: UserType) => {
    const gamesRef = database.ref('/games');

    if (gamesRef) {
        const newGame = await gamesRef.push({
            theme,
            gridSize,
            cards: theme === 'Numbers' ? await getCardsAsNumbers(gridSize) : await getCardsAsIcons(gridSize),
            closed: false,
            foundedCards: [],
            players: [{ ...user }],
            currentPlayer: {...user},
            playersCount,
        } as GameType);

        if (newGame) return newGame.key;
    }
    
    return '';
};

export const joinExistingGame = async (gameKey: string, user: UserType) => {
    const gameRef = database.ref(`/games/${gameKey}`);
    const gameVal = (await gameRef.get()).val() as GameType;

    if (gameRef &&
        gameVal) {
            const playerAlreadyInGame = gameVal.players.some(p => p.id === user.id);
            
            if (playerAlreadyInGame) return true;

            const playerCanJoinGame = (gameVal.players.length + 1) <= gameVal.playersCount;
                        
            if (playerCanJoinGame) {
                gameRef.set({
                    ...gameVal,
                    players: [...gameVal.players, user],
                } as GameType);
        
                return true;
            }
    }

    return false;
};