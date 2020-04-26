import { takeNWords, words } from './Words';

export function OPEN(w) {
    return {
        type: 'open',
        word: w
    };
}

export function FINISH_TURN() {
    return {
        type: 'finish-turn'
    };
}

export function NEW_GAME() {
    return {
        type: 'new-game'
    }
}

export function SPY_MASTER() {
    return {
        type: 'spy-master'
    }
}

function makeBoard(wordList) {
    const redWords = takeNWords(wordList, 9);
    
    const remainingList = wordList.filter((v) => { return !redWords.includes(v); });
    
    const blueList = takeNWords(remainingList, 8);
    
    const finalLeft = remainingList.filter((v) => { return !blueList.includes(v); });
    
    const blackWord = takeNWords(finalLeft, 1)[0];

    return wordList.map((v, i, a) => {
        return {
            name: v,
            color: redWords.includes(v) ? 'red' : (blueList.includes(v) ? 'blue' : (blackWord == v) ? 'black' : 'grey'),
            open: false
        };
    });
}

function openBoardTile(board, wordFilter) {
    return board.map((v, i, a) => {
        return {
            ...v,
            open: (v.open) ? true : (wordFilter(v.name))
        };
    });
}

function getColor(board, word) {
    return board.filter((v) => {
        return v.name === word;
    }).map((v, i, a) => {
        return v.color;
    });
}

function toggleTurn(turn) {
    return (turn === 'red') ? 'blue' : 'red';
}

export default function reducer(
    state = {
        board: makeBoard(takeNWords(words, 25)),
        left: {
            red: 9,
            blue: 8,
            grey: 7,
            black: 1
        },
        turn: 'red',
        gameOver: false,
        spyMaster: false
    },
    action
) {
    switch (action.type) {
        case 'open':
            console.log('action: choose');
            let wordColor = getColor(state.board, action.word);
            console.log('Word color = ' + wordColor);
            console.log('Turn = ' + state.turn);
            let over = (wordColor == 'black' || (wordColor != 'grey' && state.left[wordColor] === 1));
            console.log('Over: ' + over);
            return {
                ...state,
                board: openBoardTile(state.board, function (v) {return over || v == action.word;}),
                left: {
                    ...state.left,
                    [wordColor]: --state.left[wordColor]
                },
                turn: (wordColor == state.turn) ? state.turn : toggleTurn(state.turn),
                gameOver: over
            };
        case 'new-game':
            console.log('action: new-game');
            return {
                ...state,
                board: makeBoard(takeNWords(words, 25)),
                left: {
                    red: 9,
                    blue: 8,
                    grey: 7,
                    black: 1
                }
            };
        case 'finish-turn':
            console.log('action: hint');
            return {
                ...state,
                turn: toggleTurn(state.turn)
            };
        case 'spy-master':
            console.log('action: spy-master');
            return {
                ...state,
                spyMaster: !state.spyMaster
            };
        default:
            return state;
    }
}