const notes = require('express').Router();
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'db', 'db.json');

const readNotes = () => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

notes.get('/api/notes', (req, res) => {
  const currentNotes = readNotes();
  res.json(currentNotes);
})

notes.post('/api/notes', (req, res) => {
  const {title, text} = req.body;
  
  if (req.body) {
    const newNote = {
      title,
      text
    }
    readAndAppend(newNote, '/db/db.json');
    res.json('Note added succesfully')
  } else {
    res.error('Error in adding note')
  }
});

notes.delete('/api/notes/:id', (req, res) => {
  
});


  module.exports = notes;