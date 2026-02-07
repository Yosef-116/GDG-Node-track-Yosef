const express = require('express')

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res)=> {
    res.send('Welcome to the Home Page')
})

app.get('/info', (req, res) => {
    res.send('This is the information page')
})

app.post('/submit', (req, res) => {
    const data = req.body()

    res.status(201).send(json(data))
})

app.listen(port, () => {
    console.log('Part-1 server is running on port ' + port);
})
