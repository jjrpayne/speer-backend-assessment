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
            return res.status(500).send(err);
        }
    },

    getNoteById : async (req, res) => {
        const userId = req.user_id;
        const text = qStrings.getNoteById;
        var values = [1*req.params.id];

        try {
            const result = await pool.query(text, values);
            if (result.rowCount == 0){
                return res.status(404).send({message: "No note found with this id."})
            }
            const note = result.rows[0];
            if (userId !== note.user_id){
                return res.status(401).send({message: "Access denied."})
            } else {
                return res.status(200).send(note);
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    createNewNote : async (req, res) => {
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
            return res.status(500).send(err);
        }
    }
}