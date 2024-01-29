import { Router } from "express";
import { 
    createNote, 
    getNotes, 
    deleteNote, 
    updateNoteCategory, 
    updateNoteDescription, 
    updateNotePriority,
    updateNoteTitle
} from "../controllers/notesController.js";

const notesRouter = Router();

notesRouter.post('/createNote', createNote);
notesRouter.get('/getAllNotes', getNotes);
notesRouter.delete('/deleteNote', deleteNote);
notesRouter.put('/updateNoteCategory', updateNoteCategory);
notesRouter.put('/updateNoteDescription', updateNoteDescription);
notesRouter.put('/updateNotePriority', updateNotePriority);
notesRouter.put('/updateNoteTitle', updateNoteTitle);

export default notesRouter;