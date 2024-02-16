import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.includes('hello')) {
      console.log('hi');
      actions.handleHello();
    }
    else if (message.includes('dog')) {
      actions.handleDog();    
    }
    else if (message.includes('gpt')) {
      actions.handleGPT();    
    }
    else{

      var QAList = window.QAList;
      var searchWordList = message.split(' ');
      var searchResultList = [];

      for(var i in QAList){

         var QAItem = QAList[i];
         
         for(var j in searchWordList){

           var searchWord = searchWordList[j];

           if(QAItem.Q_ko.indexOf(searchWord)!=-1){
            searchResultList.push(QAItem)
           }
           if(QAItem.Q_en.indexOf(searchWord)!=-1){
            searchResultList.push(QAItem)
           }

         }
      }

      console.log(searchResultList)

      if(searchResultList.length > 0 ){
        const randomElement = searchResultList[Math.floor(Math.random() * searchResultList.length)];
        console.log(randomElement)

        var isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; 

        if(isKorean.test(message)){
          actions.handleGPT(randomElement.A_ko); 
        }else{
          actions.handleGPT(randomElement.A_en); 
        }

      }
      else{
        //no result.
        console.log('no Result.')
        actions.handleGPT("I don't understand the question. Ask questions in simple words.");    

      }

    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {},
        });
      })}
    </div>
  );
};

export default MessageParser;