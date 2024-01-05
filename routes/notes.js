const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users');
const NotesController = require('../controllers/notes');

// get all notes
router.get('/api/notes',
    UsersController.verifyToken,
    NotesController.getNotes
);

// get single note by id
router.get('/api/notes/:id',
    UsersController.verifyToken,
    NotesController.getNoteById
);

// add note
router.post('/api/notes',
    UsersController.verifyToken,
    NotesController.createNewNote
);

// update existing note
router.put('/api/notes/:id',
    UsersController.verifyToken,
    NotesController.checkIfNoteBelongsToUser,
    NotesController.editNote
);

// delete existing note
router.delete('/api/notes/:id',
    UsersController.verifyToken,
    NotesController.checkIfNoteBelongsToUser,
    NotesController.deleteNote
);

// share note with another user
router.post('/api/notes/:id/share',
    UsersController.verifyToken,
    NotesController.checkIfNoteBelongsToUser,
    NotesController.findRecipientUser,
    NotesController.createNewNote
);

// search notes by keyword
router.get('/api/search',
    UsersController.verifyToken,
    NotesController.searchNotes
);

module.exports = router;