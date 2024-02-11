/**
 * @description Router for handling notes-related API endpoints.
 * @module notesRouter
 */

// External module import.
import { Router } from "express";

// Internal module import.
import { 
    createNote, 
    getNotes,
    getNotesByCategory, 
    deleteNote, 
    updateNoteCategory, 
    updateNoteDescription, 
    updateNotePriority,
    updateNoteTitle
} from "../controllers/notesController.js";
import authenticate from "../middlewares/authMiddleware.js";

/**
 * Instance of the Express Router.
 * @type {object}
 * @const
 */
const notesRouter = Router();

/**
 * Route to create a new note.
 * It needs: id(user), title and description.
 * @name post/createNote
 * @function
 * @memberof module:notesRouter
 */
notesRouter.post('/createNote', authenticate, createNote);

/**
 * Route to get all notes.
 * @name get/getAllNotes
 * @function
 * @memberof module:notesRouter
 */
notesRouter.get('/getAllNotes', authenticate, getNotes);

/**
 * Route to get notes by category.
 * It needs: id(user) and categoryID.
 * @name get/getNotesByCategory
 * @function
 * @memberof module:notesRouter
 */
notesRouter.get('/getNotesByCategory', authenticate, getNotesByCategory);

/**
 * Route to delete a note.
 * It needs: id(user) and noteID.
 * @name delete/deleteNote
 * @function
 * @memberof module:notesRouter
 */
notesRouter.delete('/deleteNote/:noteID', authenticate, deleteNote);

/**
 * Route to update a note category.
 * It needs: id(user), noteID and newCategoryID.
 * @name put/updateNoteCategory
 * @function
 * @memberof module:notesRouter
 */
notesRouter.put('/updateNoteCategory', authenticate, updateNoteCategory);

/**
 * Route to update a note description.
 * It needs: id(user), noteID and newDescription.
 * @name put/updateNoteDescription
 * @function
 * @memberof module:notesRouter
 */
notesRouter.put('/updateNoteDescription', authenticate, updateNoteDescription);

/**
 * Route to update a note priority.
 * It needs: id(user), noteID and newPriorityID.
 * @name put/updateNotePriority
 * @function
 * @memberof module:notesRouter
 */
notesRouter.put('/updateNotePriority', authenticate, updateNotePriority);

/**
 * Route to update a note title.
 * It needs: id(user), noteID and newTitle.
 * @name put/updateNoteTitle
 * @function
 * @memberof module:notesRouter
 */
notesRouter.put('/updateNoteTitle', authenticate, updateNoteTitle);

export default notesRouter;