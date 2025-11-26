const express = require('express');
const router = express.Router();
const { createNote,getallNotes,getNoteById,updateNotebyId } = require('../controllers/noteControllers');

router.post('/create-note', createNote)
router.get('/getallnotes', getallNotes)
router.get('/getnotebyid/:id', getNoteById)
router.put('/updatenotebyid/:id', updateNotebyId)


module.exports = router;