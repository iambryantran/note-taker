const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const { v4: uuid } = require('uuid');

const PORT = (process.env.PORT || 3001);

// Borrowed and adjusted from Lesson 20
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));



// API Routes
// Might need to go above *

app.get('/api/notes', (req, res) => {
    // readFile asks for a callback
    const oldNotes = fs.readFileSync('./db/db.json', 'utf-8');
    if (oldNotes) {
        
        console.log('it works')
        const oldNotesParsed = JSON.parse(oldNotes);
        res.status(200).json(oldNotesParsed);
    } else {
        res.json("[]");
    }
});

app.post('/api/notes', (req, res) => {
    const newNotes = {
        ...req.body,
        id: uuid()
    };
    const oldNotes = fs.readFileSync('./db/db.json', 'utf-8');
    const oldNotesParsed = JSON.parse(oldNotes);
    if (!oldNotes) {
        fs.writeFileSync('./db/db.json', '[]')
    }
    console.log(oldNotesParsed);
    // newNotes.id = uuid.v4();
    oldNotesParsed.push(newNotes);
    fs.writeFileSync('./db/db.json', JSON.stringify(oldNotesParsed));
    res.json(newNotes);
})


// Routes to serve /notes and /*
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
    });

app.get('/*', (req, res) =>
res.sendFile(path.join(__dirname, './public/index.html'))
);

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);