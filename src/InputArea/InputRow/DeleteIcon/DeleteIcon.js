import React, { Component } from 'react';

import './DeleteIcon.css';

import Row from 'react-bootstrap/Row';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'

const deleteIcon = (props) => (

    <Row className="align-items-center ml-1">
        <FontAwesomeIcon onClick={props.deleteIconClicked} icon={faMinusCircle} className="DeleteIcon" />
    </Row>

)

export default deleteIcon;