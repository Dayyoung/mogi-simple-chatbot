import React, { useEffect, useState } from 'react';
import $ from 'jquery';

const ChatGPT = (message) => {
  const [imageUrl, setImageUrl] = useState('');

  //var QAList = GsheetToJSON('https://docs.google.com/spreadsheets/d/1Y5iDcfmkgzbzbmd7TcVFi6lCJBH8LhwwQ2HRBdgqD7o/edit#gid=1614320406')
  var QAList = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRD2q5f3T9qqFEpg1kX9wk_v4Q0X0FpdyENFkdCFmD-aOWi6Xb4pGMTB4pNhiY_62E6-nNAeUommlXX/pub?gid=1559298847&single=true&output=csv';

  return (
    <div>
      {/*<img src={imageUrl} alt='a dog' />*/}
    </div>
  );
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


export default ChatGPT;