const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users');
const NotesController = require('../controllers/notes');

router.get('/api/notes',
    UsersController.verifyToken,
    NotesController.getNotes
);

router.get('/api/notes/:id',
    UsersController.verifyToken,
    NotesController.getNoteById
);

router.post('/api/notes',
    UsersController.verifyToken,
    NotesController.createNewNote
);

router.put('/api/notes/:id',
    UsersController.verifyToken,
    NotesController.checkIfNoteBelongsToUser,
    NotesController.editNote
);

module.exports = router;