// in config.js
import { createChatBotMessage } from 'react-chatbot-kit';
import { createClientMessage } from 'react-chatbot-kit';
import { createCustomMessage } from 'react-chatbot-kit';

import DogPicture from '../chatbot/DogPicture.jsx';
import ChatGPT from '../chatbot/ChatGPT.jsx';
import $ from 'jquery';


const botName = 'ChatBot';

const messageWithProperties = createChatBotMessage('Hello. I am a simple chatbot🤖!', {
  //widget: 'my-widget',
  //payload: {'1':'2'}, // any value I want to send to the given widget or message
  //delay: 100,
});

getQAList();


const config = {
  initialMessages: [messageWithProperties],
  //initialMessages: [createChatBotMessage(`Hi! I'm ${botName}`)],

  widgets: [
    {
      widgetName: 'dogPicture',
      widgetFunc: (props) => <DogPicture {...props} />,
    },
    {
      widgetName: 'chatGPT',
      widgetFunc: (props) => <ChatGPT {...props} />,
    },
  ],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },
};

function getQAList() {
    var requestUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRD2q5f3T9qqFEpg1kX9wk_v4Q0X0FpdyENFkdCFmD-aOWi6Xb4pGMTB4pNhiY_62E6-nNAeUommlXX/pub?gid=1559298847&single=true&output=csv';
    $.get( requestUrl, function( data ) {
    var jsonData = csvToJSON(data);
    console.log(jsonData);
    window.QAList = jsonData;
    });
}

function csvToJSON(csv_string) {
  const rows = csv_string.split("\r\n");
  const jsonArray = [];
  const header = rows[0].split(",");
  for (let i = 1; i < rows.length; i++) {
    let obj = {};
    let row = rows[i].split(",");
    for (let j = 0; j < header.length; j++) {
      obj[header[j]] = row[j];
    }
    jsonArray.push(obj);
  }
  return jsonArray;
}



export default config;