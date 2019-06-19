const express = require('express')
const app = express()
const port = 8000

app.get('/courseDetails', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Live session app listening on port ${port}!`))