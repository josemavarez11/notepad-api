//External module imports.
import Note from '../models/noteModel.js';
import User from '../models/userModel.js';
import Category from '../models/categoryModel.js';
import Priority from '../models/priorityModel.js';

/**
 * Function to create a new note.
 * @param {*} req 
 * @param {*} res 
 * @returns {void}
 */
export const createNote = async (req, res) => {
    const id = req.user._id;
    const { title, description } = req.body;

    if(!id) return res.status(400).json({ message: "User ID is required to create a new note." });
    if(!title) return res.status(400).json({ message: "Note title is required to create a new note." });
    if(!description) return res.status(400).json({ message: "Note description is required to create a new note." });

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found." });

        const note = new Note({ user: id, title: title, description: description });
        await note.save();
        return res.status(201).json({ message: "Note created successfully."})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * Function to get all notes.
 * @param {*} req 
 * @param {*} res 
 * @returns {void}
 */
export const getNotes = async (req, res) => {
    const id = req.user._id;

    if(!id) return res.status(400).json({ message: "User ID is required to get notes." });

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found." });

        const notes = await Note.find({ user: id });
        if(!notes) return res.status(404).json({ message: "Notes not found." });

        const formattedNotes = await Promise.all(notes.map(async note => {
            const priority = note.priority ? await Priority.findById(note.priority) : null;
            const category = note.category ? await Category.findById(note.category) : null;

            return {
                id: note._id,
                title: note.title,
                description: note.description,
                priority: priority ? {
                    id: priority._id,
                    value: priority.value,
                    description: priority.description
                } : null,
                category: category ? {
                    id: category._id,
                    name: category.name
                } : null
            };
        }));
        res.status(200).json(formattedNotes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * Function to get notes by category.
 * @param {*} req 
 * @param {*} res 
 * @returns {void}
 */
export const getNotesByCategory = async (req, res) => {
    const id = req.user._id;
    const { categoryID } = req.query;

    if(!id) return res.status(400).json({ message: "User ID is required to get notes by category." });
    if(!categoryID) return res.status(400).json({ message: "Category ID is required to get notes by category." });

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found." });

        const category = await Category.findById(categoryID);
        if (!category) return res.status(404).json({ message: "Category not found." });

        const notes = await Note.find({ user: id, category: categoryID });

        const formattedNotes = await Promise.all(notes.map(async note => {
            const priority = note.priority ? await Priority.findById(note.priority) : null;
            return {
                id: note._id,
                title: note.title,
                description: note.description,
                priority: priority ? {
                    id: priority._id,
                    value: priority.value,
                    description: priority.description
                } : null,
            };
        }))

        res.status(200).json(formattedNotes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * Function to delete a note.
 * @param {*} req 
 * @param {*} res 
 * @returns {void}
 */
export const deleteNote = async (req, res) => {
    const id = req.user._id;
    const { noteID } = req.body;

    if(!id) return res.status(400).json({ message: "User ID is required to delete a note." });
    if(!noteID) return res.status(400).json({ message: "Note ID is required to delete note." });

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found." });

        const note = await Note.findOne({ _id: noteID, user: id });
        if(!note) return res.status(404).json({ message: "Note not found." });

        await note.deleteOne();
        res.status(200).json({ message: "Note deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * Function to update a note title.
 * @param {*} req 
 * @param {*} res 
 * @returns {void}
 */
export const updateNoteTitle = async (req, res) => {
    const id = req.user._id;
    const { noteID, newTitle } = req.body;

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

/**
 * Function to update a note description.
 * @param {*} req 
 * @param {*} res 
 * @returns {void} 
 */
export const updateNoteDescription = async (req, res) => {
    const id = req.user._id;
    const { noteID, newDescription } = req.body;

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

/**
 * Function to update a note category.
 * @param {*} req 
 * @param {*} res 
 * @returns {void}
 */
export const updateNoteCategory = async (req, res) => {
    const id = req.user._id;
    const { noteID, newCategoryID } = req.body;

    if(!id) return res.status(400).json({ message: "User ID is required to update a note category." });
    if(!noteID) return res.status(400).json({ message: "Note ID is required to update a note category." });
    if(!newCategoryID) return res.status(400).json({ message: "New category ID is required to update a note category." });

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found." });

        const note = await Note.findOne({ _id: noteID, user: id });
        if(!note) return res.status(404).json({ message: "Note not found." });

        if(note.category === newCategoryID) return res.status(400).json({ message: "New category is the same as the old one. No changes made." });

        note.category = newCategoryID;
        await note.save();
        res.status(200).json({ message: "Note category updated successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * Function to update a note priority.
 * @param {*} req 
 * @param {*} res 
 * @returns {void}
 */
export const updateNotePriority = async (req, res) => {
    const id = req.user._id;
    const { noteID, newPriorityID } = req.body;

    if(!id) return res.status(400).json({ message: "User ID is required to update a note priority." });
    if(!noteID) return res.status(400).json({ message: "Note ID is required to update a note priority." });
    if(!newPriorityID) return res.status(400).json({ message: "New category ID is required to update a note priority." });

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found." });

        const note = await Note.findOne({ _id: noteID, user: id });
        if(!note) return res.status(404).json({ message: "Note not found." });

        if(note.priority === newPriorityID) return res.status(400).json({ message: "New priority is the same as the old one. No changes made." });
        note.priority = newPriorityID;
        await note.save();
        res.status(200).json({ message: "Note priority updated successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}