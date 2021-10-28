//Dependencies: 

const express = require('express'); 
const cors = require('cors');
const twilio = require('twilio'); 

//twilio requirements -- Texting API 
const accountSid = 'AC5fbf58e306e4dcdb667d2df03f7f2a49';
const authToken = '47759e75078228f4b29f026e7d3a1e13'; 
const client = new twilio(accountSid, authToken);

const app = express(); //alias

app.use(cors()); //Blocks browser from restricting any data

const numToLink = {
    "1" : "https://www.youtube.com/watch?v=LQ6ut9Y-9Z4",
    "2" : "https://www.youtube.com/watch?v=Qm846KdZN_c",
    "3" : "https://www.youtube.com/watch?v=XxP8kxUn5bc",
    "4" : "https://www.youtube.com/watch?v=zofBinqC2F4",
    "5" :  "https://www.youtube.com/watch?v=UyZfCrrdbm8"
};

//Welcome Page for the Server 
app.get('/', (req, res) => {
    res.send('Welcome to the Express Server')
})

//Twilio 
app.get('/send-text', (req, res) => {
    //Welcome Message
    res.send('Hello to the Twilio Server')

    //_GET Variables
    const { recipient, caseNum, ucrCode } = req.query;
    let youtubeVid = '';

    for (let [key, value] of Object.entries(numToLink)) {
        if(ucrCode == key) {
            youtubeVid = value;
            console.log(youtubeVid);
        }
    }

    console.log('Recipient: ' + recipient + '    Text Message: ' + youtubeVid)

    //Send Text
    client.messages.create({
        body: 'Case Number: ' + caseNum + '\nLAPD PSA:\nARRESTED FOR DOMESTIC VIOLENCE? Watch this video:\n' + youtubeVid + '\n\nTo stop receiving text notifications, reply STOP',
        to: '+1' + recipient,  // Text this number
        from: '+18639008467' // From a valid Twilio number
    }).then((message) => console.log('The message body is: ' + message.body)).catch((err) => console.log(err));
})

app.listen(4000, () => console.log("Running on Port 4000"))