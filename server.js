const express = require('express')
const fs = require('fs');
const app = express()
const port = process.env.PORT || 8000

app.get('/courseDetails', (req, res) => sendLiveSessionData(req,res));

app.listen(port, () => console.log(`Live session app listening on port ${port}!`))

sendLiveSessionData(req,res) {

return res.json({key: 'new value'});}