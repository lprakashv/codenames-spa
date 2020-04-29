
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