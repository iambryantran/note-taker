const express = require('express');
const fs = require('fs');
const app = express();

const PORT = 3001;


// Needs Fixing
app.get('/*', (req, res) =>
    res.sendFile(path.join(__dirname, './index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '../notes.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
