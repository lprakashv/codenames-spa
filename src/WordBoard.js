import React, { Component } from 'react';
import { Container, Row, Col, Button, Badge, Card, Jumbotron, ButtonGroup, Text } from 'react-bootstrap';
import { connect } from 'react-redux';

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
        const { board, chooseWord, left, turn, gameOver, spyMaster, toggleSpymaster } = this.props;

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
                <Button variant={(turn == 'blue') ? 'primary' : 'danger'}>End {turn}'s Turn</Button>
                <Button variant={(spyMaster) ? 'dark' : 'light'} onClick={() => toggleSpymaster()}>Spy Master</Button>
            </ButtonGroup>

        if (gameOver) {
            lastRow = <h1>GAME OVER, WINNER IS "{(left.red == left.blue) ? 'BLUE' : 'RED'}"</h1>
        }

        return (
            <Card style={{ borderRadius: 10 }}>
                <Card.Header><Jumbotron fluid><h1>Codenames Game</h1></Jumbotron></Card.Header>
                <Card.Body style={{ backgroundColor: (spyMaster) ? 'black' : 'lavender' }}>
                    <Container style={{ padding: 10 }}>
                        <Row fluid style={{margin: 5}}
                            className="justify-content-md-center">
                            <Col sm={3}><h1><Badge variant="danger">Reds left: {left.red}</Badge></h1></Col>
                            <Col sm={3}><h1><Badge variant="primary">Blues left: {left.blue}</Badge></h1></Col>
                        </Row>
                        {rows}
                        <Row
                            className="justify-content-md-center">
                            <Col sm={3}>
                                {lastRow}
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
                <Card.Footer>
                    Made by Lalit Prakash Vatsal
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