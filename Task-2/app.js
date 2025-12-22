import express from 'express'

const app = express()
const PORT = 3000

app.get('/Home', (req, res) => {
    res.status(200).send('<h1 style="color: green"> Welcome to my express app</h1>')
})

app.get('/About', (req, res) => {
    res.status(200).type('text/plain').send('This express app demonstrates Express.js routing using E26 syntax.')
})

app.get('/students/:studentId' , (req, res) => {
    const studentId = req.params.studentId
    const department = req.query.department

    res.status(200).json({
        id: studentId,
        department: department || 'Not Specified',
        status: 'Active',
        school: 'Addis Ababa Science And Technology University'
    })
})

app.listen(PORT, () => {
    console.log(`My express app is running on http://localhost:${PORT}`);
})
