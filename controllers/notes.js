const pool = require('../db/dbConfig');
const qStrings = require('../db/sqlStrings');

module.exports = {
    getNotes : async (req, res) => {
        const userId = req.user_id;
        const text = qStrings.getAllNotesForUser;
        var values = [userId];

        try {
            const result = await pool.query(text, values);
            if (result.rowCount == 0) {
                return res.status(200).send({message: "No notes found for this user."})
            }
            const notesList = result.rows;
            return res.status(200).send(notesList);
        } catch (err) {
            return res.status(500).send({error: "Internal server error"});
        }
    },

    getNoteById : async (req, res) => {
        const userId = req.user_id;
        const text = qStrings.getNoteById;
        var values = [1*req.params.id];

        try {
            const result = await pool.query(text, values);
            if (result.rowCount == 0){
                return res.status(404).send({error: "No note found with this id."})
            }
            const note = result.rows[0];
            if (userId !== note.user_id){
                return res.status(401).send({error: "Access denied."})
            } else {
                return res.status(200).send(note);
            }
        } catch (err) {
            return res.status(500).send({error: "Internal server error"});
        }
    },

    checkIfNoteBelongsToUser : async(req, res, next) => {
        const userId = req.user_id;
        const text = qStrings.getNoteById;
        var values = [1*req.params.id];

        try {
            const result = await pool.query(text, values);
            if (result.rowCount == 0){
                return res.status(404).send({error: "No note found with this id."})
            }
            const note = result.rows[0];
            if (userId !== note.user_id){
                return res.status(401).send({error: "Access denied."})
            } else {
                req.body.old_note = note.note;
                next();
            }
        } catch (err) {
            return res.status(500).send({error: "Internal server error"});
        }
    },

    createNewNote : async (req, res) => {
        console.log("creating new note");
        const userId = req.user_id;
        const text = qStrings.addNewNote;
        const b = req.body;
        var values = [userId, b.note];

        try {
            const result = await pool.query(text, values);
            const note = result.rows[0];
            return res.status(200).send({
                message: "Success! Note created.",
                note: note
            });
        } catch (err) {
            return res.status(500).send({error: "Internal server error"});
        }
    },

    editNote : async (req, res) => {
        const text = qStrings.editNote;
        const b = req.body;
        var values = [b.note, 1*req.params.id];

        try {
            const result = await pool.query(text, values);
            const note = result.rows[0];
            return res.status(200).send({
                message: "Success! Note updated.",
                oldNote: b.old_note,
                note: note
            });
        } catch (err) {
            return res.status(500).send({error: "Internal server error"});
        }
    },

    deleteNote: async (req, res) => {
        const text = qStrings.deleteNote;
        var values = [1*req.params.id];

        try {
            const result = await pool.query(text, values);
            const note = result.rows[0];
            return res.status(200).send({
                message: "Success! Note deleted.",
                deletedNote: note
            });
        } catch (err) {
            return res.status(500).send({error: "Internal server error"});
        }
    },

    findRecipientUser: async (req, res, next) => {
        const b = req.body;
        const text = qStrings.findUser;
        var values = [b.username];

        try {
            const result = await pool.query(text, values);
            if(result.rowCount === 0){
                return res.status(401).send({
                    error: "No user found with that username."
                })
            } else {
                req.user_id = result.rows[0].id;
                req.body.note = b.old_note;
                next();
            }
        } catch (err) {
            return res.status(500).send({error: "Internal server error"});
        }
    },

    searchNotes: async(req, res) => {
        if(!req.query.q){
            return res.status(400).send({error: "Query required."});
        }
        const userId = req.user_id;
        const text = qStrings.searchNotes;
        var values = [userId, req.query.q];

        try {
            const result = await pool.query(text, values);
            if(result.rowCount === 0){
                return res.status(200).send({
                    message: "No results found for this query."
                })
            } else {
                res.status(200).send(result.rows);
            }
        } catch (err) {
            return res.status(500).send({error: "Internal server error"});
        }
    }
}