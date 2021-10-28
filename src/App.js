import React, {Component} from 'react';
import './App.css';

import logo_noho from './assets/images/lapd_noho_logo.png';
import logo_lapd from './assets/images/LAPD-Logo.png';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import InputRow from './InputArea/InputRow/InputRow';


class App extends Component {

  state = {
    text: {
      recipient: '',
      caseNum: null,
      ucrCode: null,
    },
    caseNums: [],
    recipients: [],
    ucrCodes: [],
    currentInputRows: [],
    amntOfInputRows: 0,
  }

  sendText = () => {
    const updatedState = this.state;

    if(this.state.currentInputRows.length !== 0) {
      this.state.caseNums.push(updatedState.caseNum);
      console.log('caseNums: ' + this.state.caseNums);
      this.state.ucrCodes.push(updatedState.ucrCode);
      console.log('ucrCodes: ' + this.state.ucrCodes)
      this.state.recipients.push(updatedState.recipient);
      console.log('Recipients: ' + this.state.recipients)
    }

    fetch(`https://617a66b406688b69f5b7b7fb--testsender.netlify.app:4000/send-text?recipient=${updatedState.recipients[0]}&caseNum=${updatedState.caseNums[0]}&ucrCode=${updatedState.ucrCodes[0]}`)
    .catch(err => console.error(err));

    updatedState.caseNums.splice(0);
    updatedState.recipients.splice(0);
    updatedState.ucrCodes.splice(0);
    updatedState.currentInputRows.splice(0);
    updatedState.amntOfInputRows = updatedState.amntOfInputRows - 1;

    this.setState(updatedState);

    console.log(this.state)
  }

  sendAllTexts = () => {
    const updatedState = this.state;

    if(updatedState.currentInputRows.length !== 0) {
      this.state.caseNums.push(updatedState.caseNum);
      console.log('caseNums: ' + this.state.caseNums);
      this.state.ucrCodes.push(updatedState.ucrCode);
      console.log('ucrCodes: ' + this.state.ucrCodes)
      this.state.recipients.push(updatedState.recipient);
      console.log('Recipients: ' + this.state.recipients)
    }

    for(let i = 0; i < updatedState.currentInputRows.length; i++) {
      fetch(`http://localhost:4000/send-text?recipient=${updatedState.recipients[i]}&caseNum=${updatedState.caseNums[i]}&ucrCode=${updatedState.ucrCodes[i]}`)
      .catch(err => console.error(err));
    } 

    for(let i = 0; i < updatedState.currentInputRows.length; i++) {
      updatedState.caseNums.splice(i);
      updatedState.recipients.splice(i);
      updatedState.ucrCodes.splice(i);
      updatedState.currentInputRows.splice(i);
      updatedState.amntOfInputRows = updatedState.amntOfInputRows - 1;
    }
    this.setState(updatedState);
  }

  recipientHandler = (event) => {
    const recipientPerson = event.target.value;

    this.setState({recipient: recipientPerson});
    // console.log("The recipient handler says: " + this.state)
  }

  caseNumHandler = (event) => {
    const caseNumber = event.target.value;
    this.setState({caseNum: caseNumber});
    // console.log("The caseNum handler says: " + this.state)
  }

  ucrCodeHandler = (event) => {
    const theUcrCode = event.target.value;
    this.setState({ucrCode: theUcrCode});
  }

  addRowHandler = () => {
    const updatedState = {...this.state};

    const index = updatedState.amntOfInputRows;

    if(this.state.currentInputRows.length !== 0) {
      this.state.caseNums.push(updatedState.caseNum);
      console.log('caseNums: ' + this.state.caseNums);
      this.state.ucrCodes.push(updatedState.ucrCode);
      console.log('ucrCodes: ' + this.state.ucrCodes)
      this.state.recipients.push(updatedState.recipient);
      console.log('Recipients: ' + this.state.recipients)
    }
   
    updatedState.currentInputRows.push(
      <InputRow 
        key={updatedState.amntOfInputRows} 
        caseNumChanged={this.caseNumHandler} 
        ucrChanged={this.ucrCodeHandler}
        recipientChanged={this.recipientHandler} 
        enterKeyPressed={this.enterPressed}
        deleteIconClicked={() => this.removeSpecificRowHandler(index)} />
    );

    console.log('Index at addRowHanlder: ' + updatedState.amntOfInputRows)
    console.log(updatedState.currentInputRows[updatedState.amntOfInputRows])
    
    updatedState.amntOfInputRows = updatedState.amntOfInputRows + 1;

    this.setState({...updatedState});
    
    // console.log(this.state.amntOfInputRows);
  }

  removeRowHandler = () => {
    const updatedState = {...this.state};
    
    // updatedState.recipients.pop();
    // updatedState.caseNums.pop();
    
    updatedState.amntOfInputRows = updatedState.amntOfInputRows - 1;
    updatedState.currentInputRows.pop();
    

    this.setState(updatedState);
    console.log('CaseNums: ' + this.state.caseNums)
    console.log('Recipients: ' + this.state.recipients)
    // console.log(this.state.amntOfInputRows);
  }

  enterPressed = (event) => {
    if(event.keyCode == 13){
      this.addRowHandler();
      // put the login here
      
    }
  }

  removeSpecificRowHandler = (key) => {
    const updatedState = {...this.state};
    console.log('Index at removeSpecificRowHandler: ' + key);

    updatedState.amntOfInputRows = updatedState.amntOfInputRows - 1;
    updatedState.caseNums.splice(key, 1);
    updatedState.ucrCodes.splice(key, 1);
    updatedState.currentInputRows.splice(key, 1);

    this.setState({updatedState});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Container className="mb-5 pt-5">
            <Row>
              <Col>
                <img src={logo_noho} width="40%" />
              </Col>
              <Col>
                <img src={logo_lapd} width="40%" />
              </Col>
            </Row>
            <Row className="mt-5">
              <Col md={4}>
                <h1>Case Number</h1>
              </Col>
              <Col md={4}>
                <h1>UCR Code</h1>
              </Col>
              <Col md={4}>
                <h1>Phone Number</h1>
              </Col>
            </Row>
          </Container>
        </header>
        <div>
          <Container>
            <form>
            {this.state.currentInputRows.map(function(input, index) {
              return input;
            })}
              {/* {console.log(this.state.amntOfInputRows)} */}
            </form>
            <Row className="mt-5">
              <Col className="text-left">
                <Button className="btn-success" onClick={this.addRowHandler}>Add Row</Button>
              </Col>
              <Col className="text-left">
                {this.state.currentInputRows.length < 2 ? <Button className="btn-danger disabled" disabled>Remove Row</Button> :
                <Button className="btn-danger" onClick={this.removeRowHandler}>Remove Row</Button>
                }
                
              </Col>
            </Row>
          </Container>
          <Container style={{marginTop: '8rem'}}>
            <Row className="justify-content-center mx-auto" style={{width: '50%'}}>
              <Col className="text-center">
                <Button className="btn-primary" onClick={this.sendText} >Send First</Button>
              </Col>
              <Col className="text-center">
                <Button className="btn-info" onClick={this.sendAllTexts}>Send All</Button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default App;
