const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');


notes.get('/', async (req, res) => {
  readFromFile('./db/db.json').then((data) =>
  res.json(JSON.parse(data))
  );
});

notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if(req.body) {
  const newNote = {
    title,
    text,
    id: uuidv4()
  };
    readAndAppend(newNote, './db/db.json');
    res.json(`Note added`);
  } else {
    res.error('Failed to add note')
  }
});

notes.delete('/:id', (req, res) => {
  const noteId = req.params.note_id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all tips except the one with the ID provided in the URL
      const result = json.filter((note) => note.note_id !== noteId);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});

  module.exports = notes;