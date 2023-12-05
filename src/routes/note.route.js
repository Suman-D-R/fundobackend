import express from 'express';
import * as noteController from '../controllers/note.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new note
router.post('/addNote',userAuth , noteController.addNote);

//route to getallnotes note
router.get('/getallnotes',userAuth,noteController.getAllNotes)

//route to update note
router.put('/updateNote',userAuth,noteController.updateNote)

//route to delete a note
router.put('/deleteNote',userAuth,noteController.deleteNote);

//route to achive a note
router.put('/achiveNote',userAuth,noteController.achiveNote);

//route to deleteForEver a note
router.delete('/deleteforever',userAuth,noteController.deleteforever)




export default router;