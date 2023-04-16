const Database = require("@replit/database")
const bodyParser = require('body-parser');
const axios = require('axios');
const db = new Database()

  countDB = [];
  rankDB = [];

  db.get("countDB").then(values => {
    const data = { values };
    countDB = data.values;
    let tempSum = 0;

    for(let i = 0; i < 785; i++)
      {
        tempSum += countDB[i];
      }

      console.log(tempSum);
  })

  db.get("rankDB").then(values => {
    const data = { values };
    rankDB = data.values;


  })




// for (let i = 0; i < 900; i++) {
//   countDB[i] = 0
// }

// for (let i = 0; i < 900; i++) {
//   rankDB[i] = 0
// }

//console.log("pica de marimbondo");

// setKey("rankDB", rankDB);
// setKey("countDB", countDB);

async function setKey(key, value) {
  await db.set(key, value);
};

async function getKeyValue(key) {
  let value = await db.get(key);
  return value;
};

async function deleteKey(key) {
  await db.delete(key);
};

async function listKeys() {
  let keys = await db.list()
  return keys;
};

async function listKeyPrefix(prefix) {
  let matches = await db.list(prefix);
  return matches;
};

// setKey("countDB", countDB);
// setKey("rankDB", rankDB);

// getKeyValue("countDB").then((value) => console.log(value + "opa kkkk"));


// getKeyValue("rankDB").then((value) => console.log(value + "opa2 kkkk"));



const express = require('express');

const { readFile, readFileSync } = require('fs');
const http = require('http');



const app = express();
app.use(express.json());

var url = '/public/style.css';



app.use(express.static('public'));
app.use(express.static('images'));


app.get('', (req, res) => {



  readFile('public/main.html', 'utf8', (err, html) => {
    if (err) {
      res.status(500).send('Vish, servidor ta com problema! Volta mais tarde');
    }

    res.send(html);


  })




});

app.get('/api/rankDB', function(req, res) {
  db.get("rankDB").then(values => {
    //console.log(value);
    const data = { values };
    res.json(data);

  }
  )
});

app.get('/api/countDB', function(req, res) {
  db.get("countDB").then(values => {
    //console.log(values);
    const data = { values };
    res.json(data);

  })
});

app.post('/apiPost/countDB', (req, res) => {
  receivedData = req.body;
  var dataPack = receivedData.sender;
    //console.log(receivedData.sender);
    //console.log(receivedData.sender[0]);
  countDB[dataPack[0]] += 1;
  countDB[dataPack[1]] += 1;
    if (rankDB[dataPack[2]] > countDB[dataPack[2]])
  {
    rankDB[dataPack[2]] -= 1;
  }
  db.set("countDB", countDB);
  res.send("Data Received!");
});


app.post('/apiPost/rankDB', (req, res) => {
  receivedData = req.body;
  var dataPack = receivedData.sender;
  //console.log(receivedData.sender);
  rankDB[dataPack[2]] += 1;
  if (rankDB[dataPack[2]] > countDB[dataPack[2]])
  {
    rankDB[dataPack[2]] -= 1;
  }
  db.set("rankDB", rankDB);
     res.send("Data Received!");
  // res.send(rankDB + " " + receivedData + " " + typeof(rankDB));
});





app.listen(3000, () => {
  console.log('server started');
});

