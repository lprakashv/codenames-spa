import React, { Component } from 'react';
import { Container, Row, Col, Button, Badge, Card, Jumbotron, ButtonGroup, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { SocialIcon } from 'react-social-icons';

import { FINISH_TURN, OPEN, NEW_GAME, SPY_MASTER } from './BoardReducer';

function Tile(props) {

    if (props.spyMaster || props.open) {
        return <Button variant="light"
            style={{
                padding: 5,
                borderRadius: 2,
                height: '100%',
                width: '100%',
                color: props.color,
                whiteSpace: 'nowrap',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
            }}
            disabled={true}>
            <p>{props.name}</p>
        </Button>;
    } else {
        return <Button variant="light"
            style={{
                padding: 5,
                borderRadius: 2,
                height: '100%',
                width: '100%',
                whiteSpace: 'nowrap',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
            }}
            onClick={() => props.chooseWord(props.name)}>
            <p>{props.name}</p>
        </Button>;
    }
}

class WordBoard extends Component {
    render() {
        const { board, chooseWord, left, turn, gameOver, spyMaster, toggleSpymaster, finishTurn } = this.props;

        function rowColumns(rowNum) {
            let cols = [];
            for (let j = 0; j < 5; j++) {
                let item = board[rowNum * 5 + j];
                cols.push(
                    <Col key={rowNum * 5 + j}
                        sm={2}
                        xs={2}
                        style={{
                            margin: 5,
                            padding: 0
                        }}
                    >
                        <Tile
                            open={item.open}
                            color={item.color}
                            name={item.name}
                            chooseWord={chooseWord}
                            spyMaster={spyMaster} />
                    </Col>
                );
            }
            return cols;
        }

        let rows = [];

        for (let i = 0; i < 5; i++) {
            rows.push(
                <Row key={i} className="justify-content-md-center">
                    {rowColumns(i)}
                </Row>
            );
        }

        let lastRow =
            <ButtonGroup fluid vertical style={{ margin: 5 }}>
                <Button variant={(turn == 'blue') ? 'primary' : 'danger'} onClick={() => finishTurn()}>End {turn}'s Turn</Button>
                <Button variant={(spyMaster) ? 'dark' : 'light'} onClick={() => toggleSpymaster()}>Spy Master</Button>
            </ButtonGroup>

        if (gameOver) {
            lastRow = <h1>GAME OVER! THE WINNER IS {(left.red == left.blue) ? <b style={{ color: 'blue' }}>TEAM BLUE</b> : <b style={{ color: 'red' }}>TEAM RED</b>}</h1>
        }

        return (
            <Card style={{ borderRadius: 10 }}>
                <Card.Header>
                    <Jumbotron fluid style={{ padding: 10 }}>
                        <h1>Codenames Game</h1>
                        <h4 style={{ textAlign: 'left' }}>Rules:</h4>
                        <p style={{ textAlign: 'left' }}>1. Have 2 teams, one "red" (first turn) and the other blue.</p>
                        <p style={{ textAlign: 'left' }}>2. Chose a person randomly from each team as a spy-master, only he/she can use the spy-master button and see the color of all the words</p>
                        <p style={{ textAlign: 'left' }}>3. The spy master gives a "single" word as a hint and and a number (say 3).</p>
                        <p style={{ textAlign: 'left' }}>4. Then his/her team members choose/open different words (max 3, the number given by their spy master). Their turn gets over as soon as the team uncover any word of different color that their own team or they voluntarily end their turn.</p>
                        <p style={{ textAlign: 'left' }}>5. Goal of each team is to finish up their color words.</p>
                        <p style={{ textAlign: 'left' }}>6. There are 9 reds (first-turn), 8 blues, 7 greys (neutral) and one back words.</p>
                        <p style={{ textAlign: 'left' }}>7. Team instantly loses if they uncover a black word.</p>
                        <p style={{ textAlign: 'left' }}>NOTE: RELOAD FOR A NEW GAME!</p>
                    </Jumbotron>
                </Card.Header>
                <Card.Body style={{ backgroundColor: (spyMaster) ? 'black' : 'lavender' }}>
                    <Container style={{ padding: 10 }}>
                        <Row fluid style={{ margin: 5 }}
                            className="justify-content-md-center">
                            <Col sm={3}><h1><Badge variant="danger">Reds left: {left.red}</Badge></h1></Col>
                            <Col sm={3}><h1><Badge variant="primary">Blues left: {left.blue}</Badge></h1></Col>
                        </Row>
                        {rows}
                        <Row
                            className="justify-content-md-center">
                            <Col sm={6}>
                                {lastRow}
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
                <Card.Footer>
                    <p>Made by Lalit Prakash Vatsal</p>
                    <SocialIcon url="https://twitter.com/lprakashv" label='twitter' />
                    <SocialIcon url="https://medium.com/@lprakashv" label='medium' />
                    <SocialIcon url="https://www.linkedin.com/in/lalit-vatsal-ab921879/" label='linkedin' />
                    <SocialIcon url="https://github.com/lprakashv" label='github' />
                </Card.Footer>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    return {
        board: state.board,
        turn: state.turn,
        left: state.left,
        gameOver: state.gameOver,
        spyMaster: state.spyMaster
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        newGame: () => dispatch(NEW_GAME()),
        chooseWord: (word) => dispatch(OPEN(word)),
        finishTurn: () => dispatch(FINISH_TURN()),
        toggleSpymaster: () => dispatch(SPY_MASTER())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WordBoard);