import React from 'react';
import InputRow from './InputRow/InputRow';

const inputArea = (props) => {
    console.log('InputArea amount of rows is: ' + props.amntOfRows)
    for(let i = 0; i < props.amntOfRows; i = i + 1) {
        return <InputRow />
    }
}

export default inputArea;