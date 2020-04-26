import React, { Component } from 'react';
import { Container, Row, Col, Button, Badge, Card, Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';

import { FINISH_TURN, OPEN, NEW_GAME } from './BoardReducer';

function Tile(props) {

    if (props.open) {
        return <Button variant="light"
            style={{
                borderRadius: 5,
                height: '100%',
                width: '100%',
                color: props.color
            }}
            disabled={true}>
            {props.name}
        </Button>;
    } else {
        return <Button variant="light"
            style={{
                borderRadius: 5,
                height: '100%',
                width: '100%'
            }}
            onClick={() => props.chooseWord(props.name)}>
            {props.name}
        </Button>;
    }
}

class WordBoard extends Component {
    render() {
        const { board, chooseWord, left, turn, gameOver } = this.props;

        function rowColumns(rowNum) {
            let cols = [];
            for (let j = 0; j < 5; j++) {
                let item = board[rowNum * 5 + j];
                cols.push(
                    <Col key={rowNum * 5 + j}
                        sm={2}
                        style={{
                            height: 70,
                            margin: 5
                        }}
                    >
                        <Tile
                            open={item.open}
                            color={item.color}
                            name={item.name}
                            chooseWord={chooseWord} />
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

        let lastRow = <Button variant={(turn == 'blue') ? 'primary' : 'danger'} style={{ width: '100%', height: '100%' }} >End {turn}'s Turn</Button>

        if (gameOver) {
            lastRow = <div style={{ width: '100%', height: '100%' }}>GAME OVER, WINNER IS "{(left.red == left.blue) ? 'BLUE' : 'RED'}"</div>
        }

        return (
            <Card  style={{borderRadius: 10}}>
                <Card.Header><Jumbotron fluid><h1>Codenames Game</h1></Jumbotron></Card.Header>
                <Card.Body style={{backgroundColor: 'lavender'}}>
                    <Container style={{ padding: 10, border: 1 }}>
                        <Row
                            style={{
                                margin: 5,
                                height: 70
                            }}
                            className="justify-content-md-center">
                            <Col sm={3}><h1><Badge variant="danger">Reds left: {left.red}</Badge></h1></Col>
                            <Col sm={3}><h1><Badge variant="primary">Blues left: {left.blue}</Badge></h1></Col>
                        </Row>
                        {rows}
                        <Row
                            style={{
                                margin: 5,
                                height: 70
                            }}
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
        gameOver: state.gameOver
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        newGame: () => dispatch(NEW_GAME()),
        chooseWord: (word) => dispatch(OPEN(word)),
        finishTurn: () => dispatch(FINISH_TURN())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WordBoard);