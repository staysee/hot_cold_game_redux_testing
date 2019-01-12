import reducer from './reducer';
import {generateAuralUpdate, restartGame, makeGuess} from './actions';


describe('reducer', () => {
    it('Should set the initial state when nothing is passed in', () => {
        const state = reducer(undefined, {type: '__UNKNOWN'});

        expect(state.guesses).toEqual([]);
        expect(state.feedback).toEqual('Make your guess!');
        expect(state.auralStatus).toEqual('');
        expect(state.correctAnswer).toBeGreaterThan(0);
        expect(state.correctAnswer).toBeLessThanOrEqual(100);
    })

    it('Should return the current state on an unknown action', () => {
        let currentState = {};
        const state = reducer(currentState, {type: '__UNKNOWN'});
       
        expect(state).toBe(currentState);
    })

    describe('generateAuralUpdate', () => {
        it('Should generate aural updates', () => {
            let state = {
                guesses: [30, 60, 80, 99],
                feedback: 'You\'re Hot!',
                auralState: ''
            };

            state = reducer(state, generateAuralUpdate());
            expect(state.auralStatus).toEqual(
                "Here's the status of the game right now: You're Hot! You've made 4 guesses. In order of most- to least-recent, they are: 99, 80, 60, 30"
            )
        })
    })

    describe('restartGame', () => {
        it('Should start a new game', () => {
            let state = {
                guesses: [60, 100 , 7, 6, 5],
                feedback: 'You Got It!',
                correctAnswer: 5
            };

            const correctAnswer = 5;

            state = reducer(state, restartGame(correctAnswer));
            expect(state.guesses).toEqual([]);
            expect(state.feedback).toEqual('Make your guess!');
            expect(state.correctAnswer).toEqual(correctAnswer);
            expect(state.auralStatus).toEqual('');
        })
    })

    describe('makeGuess', () => {
        it('Should make a guess', () => {
            let state = {
                guesses: [],
                feedback: '',
                correctAnswer: 100
            };

            state = reducer(state, makeGuess(30));
            expect(state.guesses).toEqual([30]);
            expect(state.feedback).toEqual('You\'re Ice Cold...');

            state = reducer(state, makeGuess(55));
            expect(state.guesses).toEqual([30, 55]);
            expect(state.feedback).toEqual('You\'re Cold...');

            state = reducer(state, makeGuess(80));
            expect(state.guesses).toEqual([30, 55, 80]);
            expect(state.feedback).toEqual('You\'re Warm.');
          

            state = reducer(state, makeGuess(99));
            expect(state.guesses).toEqual([30, 55, 80, 99]);
            expect(state.feedback).toEqual('You\'re Hot!');

            state = reducer(state, makeGuess(100));
            expect(state.guesses).toEqual([30, 55, 80, 99, 100]);
            expect(state.feedback).toEqual('You got it!');
        })
    })
})