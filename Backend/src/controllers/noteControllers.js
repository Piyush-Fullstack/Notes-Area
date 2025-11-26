const noteModel = require('../models/Note')

const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: "Title and Content are required"
            });
        }

        const note = await noteModel.create({
            title,
            content
        });

        return res.status(201).json({
            message: "Note Created Successfully",
            note: {
                id: note._id,
                title: note.title,
                content: note.content,
                updatedAt: note.updatedAt
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            data: error.message
        });
    }
}

const getallNotes = async (req, res) => {
    try {
        const notes = await noteModel.find();

        return res.status(200).json({
            message: "All Notes",
            data: notes
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            data: error.message
        });
    }
}

const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await noteModel.findById(id);

        if (!note) {
            return res.status(404).json({
                message: "Note Not Found"
            });
        }

        return res.status(200).json({
            message: "Note Found",
            data: note
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            data: error.message
        });
    }
}

const updateNotebyId = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: "Title and Content are required"
            });
        }

        const note = await noteModel.findByIdAndUpdate(
            id,
            {
                title,
                content
            },
            { new: true }
        );

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        return res.status(200).json({
            message: "Note Updated Successfully",
            data: note
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            data: error.message
        });
    }
}

module.exports = {
    createNote,
    getallNotes,
    getNoteById,
    updateNotebyId
}
