import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl'

import DeleteIcon from './DeleteIcon/DeleteIcon';

const inputRow = (props) => (
    <Row className="mt-3">
        <Col>
            <FormControl type="text" onChange={props.caseNumChanged} />
        </Col>
        <Col>
            <FormControl type="text" onChange={props.ucrChanged} />
        </Col>
        <Col>
            <FormControl type="text" onChange={props.recipientChanged} onKeyDown={props.enterKeyPressed} />
        </Col>
        <DeleteIcon deleteIconClicked={props.deleteIconClicked}/>
    </Row>
);

export default inputRow;