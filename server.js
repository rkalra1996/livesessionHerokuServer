const express = require('express');
const fs = require('fs');

const dir = require('path');
const app = express();
const port = process.env.PORT || 8000

app.use(express.urlencoded());
app.use(express.json());

app.use('/courseDetails', (req,res,next) => checkFile(req, res, next));

app.route('/courseDetails')
  .get((req, res) => getLiveSessionData(req, res))
  .post((req, res) => updateliveSession(req, res));

  function checkFile(req,res,next) {
    if (!fs.existsSync(dir.join(__dirname, 'livesession.json'))) {
      console.log('there is no session file, creating one');
      let response = fs.writeFileSync(dir.join(__dirname, 'livesession.json'));
        if (response !== undefined) {
          console.log('An error occured while creating the file named livesession.json', err);
          return res.status(500);
        }
        console.log('File successfully created');
    } else {console.log('file present')}
    next();
  }

function getLiveSessionData(req, res) {
  console.log('get data');
  let data = fs.readFileSync(dir.join(__dirname, 'livesession.json'), 'utf-8');
    if (!!!data) {
      console.log('Error occured while reading the file');
      return res.sendStatus(500);
    } else {
      try {
        data = JSON.parse(data);
      }
      catch (e) {
        console.log('An error occured while parsing data from the file  ', e);
        data = [];
      }
      return res.json(data);
    }
  }

function updateliveSession(req, res) {
  console.log('update');
  //write contents in the file
  let dataToWrite = JSON.stringify(req.body) ? JSON.stringify(req.body) : '';
  let response = fs.writeFileSync(dir.join(__dirname, 'livesession.json'), dataToWrite);
    if(response === false) {
      return res.status(500);
    }
    return res.sendStatus(200);
}

app.listen(port, () => console.log(`Live session app listening on port ${port}!`))