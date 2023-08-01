const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.get('/', (req, res) => {
    res.sendFile(path.join('/public/index.html'));
  });

app.get('/notes', (req, res) => {
    res.sendFile(path.join('/public/notes.html'));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);