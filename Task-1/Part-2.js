const express = require('express')
const { log } = require('node:console')

const app = express()
const port = 4000

app.use(express.json())

let students = []

app.get('/students', (req, res) => {
    res.send(json(students))
})

app.post('/students', (req, res) => {
    const { name } = req.body;
    
    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }

    const newStudent = {
        id, 
        name: name
    };

    students.push(newStudent);
    res.status(201).json(newStudent);
});

app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    const studentIndex = students.findIndex(s => s.id === id);

    if (studentIndex !== -1) {
        
        students[studentIndex].name = name;
        res.json(students[studentIndex]);
    } else {
        
        res.status(404).send(json({ message: "Student not found" }));
    }
});

app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const studentIndex = students.findIndex(s => s.id === id);

    if (studentIndex !== -1) {
        
        students.splice(studentIndex, 1);
        res.json({ message: "Student removed successfully" });
    } else {
        
        res.status(404).json({ message: "Student not found" });
    }
})

app.listen(port, () => {
    console.log('Part-2 server is listening on port '+ port);
    
})