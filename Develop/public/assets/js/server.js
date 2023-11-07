const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const PORT = 3001;

// Borrowed and adjusted from Lesson 20
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('../../../public'));

// Routes to serve /notes and /*
app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '../../notes.html'))
);

app.get('/*', (req, res) =>
res.sendFile(path.join(__dirname, '../../index.html'))
);

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);

// API Routes
// Might need to go above *

app.get('/api/notes', (req, res) => {
    // readFile asks for a callback
    const oldNotes = fs.readFileSync('../../../db/db.json', 'utf-8');
    if (oldNotes) {
        const oldNotesParsed = JSON.parse(oldNotes);
        res.json(oldNotesParsed);
    } else {
        res.json("[]");
    }
});

app.post('/api/notes', (req, res) => {
    const newNotes = req.body;
    const oldNotes = fs.readFileSync('../../../db/db.json', 'utf-8');
    const oldNotesParsed = JSON.parse(oldNotes);
    if (!oldNotes) {
        fs.writeFileSync('../../../db/db.json', '[]')
    }
    console.log(oldNotesParsed);
    oldNotesParsed.push(newNotes);
    fs.writeFileSync('../../../db/db.json', JSON.stringify(oldNotesParsed));
    res.json(newNotes);
})