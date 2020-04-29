import React from 'react';
import { Jumbotron } from 'react-bootstrap';

export default function GameRulesJumbotron() {
    return <Jumbotron fluid style={{ padding: 10 }}>
        <h1>Codenames Game</h1>
        <h4 style={{ textAlign: 'left' }}>Rules:</h4>
        <p style={{ textAlign: 'left' }}>1. Have 2 teams, one "red" (first turn) and the other blue.</p>
        <p style={{ textAlign: 'left' }}>2. Choose a person randomly from each team as a spy-master, only he/she can use the spy-master button and see the color of all the words</p>
        <p style={{ textAlign: 'left' }}>3. The spy master gives a "single" word as a hint and and a number (say 3).</p>
        <p style={{ textAlign: 'left' }}>4. Then his/her team members choose/open different words (max 3, the number given by their spy master). Their turn gets over as soon as the team uncover any word of different color that their own team or they voluntarily end their turn.</p>
        <p style={{ textAlign: 'left' }}>5. Goal of each team is to finish up their color words.</p>
        <p style={{ textAlign: 'left' }}>6. There are 9 reds (first-turn), 8 blues, 7 greys (civilians) and one back (assassin) words.</p>
        <p style={{ textAlign: 'left' }}>7. A team instantly loses if they uncover a black (assassin) word.</p>
    </Jumbotron>;
}