import React, { Component } from 'react';
import { Container, Row, Col, Button, Badge, Card, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { SocialIcon } from 'react-social-icons';

import { FINISH_TURN, OPEN, NEW_GAME, SPY_MASTER } from '../actions/GameActions';
import BoardTile from './BoardTile';
import GameRulesJumbotron from './GameRulesJumbotron';

class WordBoard extends Component {
    render() {
        const { board, chooseWord, left, turn, gameOver, spyMaster, toggleSpymaster, finishTurn, newGame } = this.props;

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
                        <BoardTile
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
                <Button disabled={spyMaster} variant={(spyMaster) ? 'secondary' : ((turn === 'blue') ? 'primary' : 'danger')} onClick={() => finishTurn()}>End {turn}'s Turn</Button>
                <Button variant='warning' onClick={() => toggleSpymaster()}>Spy Master</Button>
            </ButtonGroup>

        if (gameOver) {
            let winner = left.blue === 0 ? 'BLUE' : (left.red === 0 ? 'RED' : (turn === 'red' ? 'RED' : 'BLUE'));
            lastRow = <h1>GAME OVER! THE WINNER IS {winner === 'BLUE' ? <b style={{ color: 'blue' }}>TEAM BLUE</b> : <b style={{ color: 'red' }}>TEAM RED</b>}</h1>
        }

        return (
            <Card style={{ borderRadius: 10, margin: 5 }}>
                <Card.Header>
                    <GameRulesJumbotron />
                </Card.Header>
                <Card.Body style={{ backgroundColor: (spyMaster) ? 'black' : 'lavender' }}>
                    <Container style={{ padding: 10 }}>
                        <Row fluid style={{ margin: 5 }}
                            className="justify-content-md-center">
                            <Col sm={6}><h2><Badge variant="danger">Reds left: {left.red}</Badge></h2></Col>
                            <Col sm={6}><h2><Badge variant="primary">Blues left: {left.blue}</Badge></h2></Col>
                        </Row>
                        {rows}
                        <Row
                            className="justify-content-md-center">
                            <Col sm={12}>
                                {lastRow}
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <Button fluid variant={'success'} style={{margin: 5}} onClick={() => newGame()}>New Game</Button>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
                <Card.Footer >
                    <p className='text-muted'>Made by Lalit Prakash Vatsal</p>
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