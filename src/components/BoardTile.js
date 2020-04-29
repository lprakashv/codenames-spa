import React from 'react';
import { Button } from 'react-bootstrap';

export default function Tile(props) {

    if (props.spyMaster || props.open) {
        return <Button variant="light"
            style={{
                padding: 2,
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
                padding: 2,
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