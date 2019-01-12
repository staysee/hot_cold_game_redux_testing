import { generateAuralUpdate,
        GENERATE_AURAL_UPDATE, 
        restartGame, 
        RESTART_GAME, 
        makeGuess, 
        MAKE_GUESS } from './actions';

describe('generateAuralUpdate', () => {
    it('Should return the action', () => {
        const action = generateAuralUpdate();
        expect(action.type).toEqual(GENERATE_AURAL_UPDATE);
    })
})

describe('restartGame', () => {
    it('Should return the action', () => {
        const correctAnswer = 100;
        const action = restartGame(correctAnswer);
        expect(action.type).toEqual(RESTART_GAME);
        expect(action.correctAnswer).toEqual(correctAnswer);
    })
})

describe('makeGuess', () => {
    it('Should return the action', () => {
        const guess = 50;
        const action = makeGuess(guess);
        expect(action.type).toEqual(MAKE_GUESS);
        expect(action.guess).toEqual(guess);
    })
})