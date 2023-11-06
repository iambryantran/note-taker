const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const PORT = 3001;


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
