import Note from '../models/noteModel.js';
import User from '../models/userModel.js';

export const createNote = async (req, res) => {
    const { id, title, description } = req.body;

    if(!id) return res.status(400).json({ message: "User ID is required to create a new note." });
    if(!title) return res.status(400).json({ message: "Note title is required to create a new note." });
    if(!description) return res.status(400).json({ message: "Note description is required to create a new note." });

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found." });

        const note = new Note({ user: id, title: title, description: description });
        await note.save(); //aquí hay un bug
        return res.status(201).json({ message: "Note created successfully."})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getNotes = async (req, res) => {
    const { id } = req.body;

    if(!id) return res.status(400).json({ message: "User ID is required to get notes." });

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found." });

        const notes = await Note.find({ user: id });
        const formattedNotes = notes.map(note => {
            return {
                id: note._id,
                title: note.title,
                description: note.description,
                priority: note.priority,
                category: note.category
            }
        });

        res.status(200).json(formattedNotes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteNote = async (req, res) => {

}

export const updateNoteTitle = async (req, res) => {
    const { id, noteID, newTitle } = req.body;

    if(!id) return res.status(400).json({ message: "User ID is required to update a note title." });
    if(!noteID) return res.status(400).json({ message: "Note ID is required to update a note title." });
    if(!newTitle) return res.status(400).json({ message: "New note title is required to update a note title." });

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found." });

        const note = await Note.findById(noteID);
        if(!note) return res.status(404).json({ message: "Note not found." });

        if(note.title === newTitle) return res.status(400).json({ message: "New note title is the same as the old one. No changes made." });

        note.title = newTitle;
        await note.save();
        res.status(200).json({ message: "Note title updated successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateNoteDescription = async (req, res) => {
    const { id, noteID, newDescription } = req.body;

    if(!id) return res.status(400).json({ message: "User ID is required to update a note description." });
    if(!noteID) return res.status(400).json({ message: "Note ID is required to update a note description." });
    if(!newDescription) return res.status(400).json({ message: "New note description is required to update a note description." });

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found." });

        const note = await Note.findById(noteID);
        if(!note) return res.status(404).json({ message: "Note not found." });

        if(note.description === newDescription) return res.status(400).json({ message: "New note description is the same as the old one. No changes made." });

        note.description = newDescription;
        await note.save();
        res.status(200).json({ message: "Note description updated successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateNoteCategory = async (req, res) => {
    const { id, noteID, newCategoryID } = req.body;

    if(!id) return res.status(400).json({ message: "User ID is required to update a note category." });
    if(!noteID) return res.status(400).json({ message: "Note ID is required to update a note category." });
    if(!newCategoryID) return res.status(400).json({ message: "New category ID is required to update a note category." });

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found." });

        const note = await Note.findById(noteID);
        if(!note) return res.status(404).json({ message: "Note not found." });

        //verificar que la categoría especificada sea del usuario especificado.

        if(note.category === newCategoryID) return res.status(400).json({ message: "New category is the same as the old one. No changes made." });

        note.category = newCategoryID;
        await note.save();
        res.status(200).json({ message: "Note category updated successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateNotePriority = async (req, res) => {

}