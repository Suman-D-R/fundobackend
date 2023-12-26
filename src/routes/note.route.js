import express from 'express';
import * as noteController from '../controllers/note.controller';
import { userAuth } from '../middlewares/auth.middleware';
import cacheMiddleware from '../middlewares/cache.middleware';

const router = express.Router();

//route to create a new note
router.post('',userAuth , noteController.addNote);

//route to getallnotes note
router.get('',userAuth,cacheMiddleware,noteController.getAllNotes)

//route to getnotes note
router.get('/:_id',userAuth, cacheMiddleware, noteController.getNotes)

//route to update note
router.put('/:_id',userAuth, noteController.updateNote) 

//route to deleteForEver a note
router.delete('/:_id',userAuth, cacheMiddleware, noteController.deleteforever) 

//route to delete a note
router.put('/:_id/deleteNote', userAuth,noteController.deleteNote);

//route to achive a note
router.put('/:_id/achiveNote', userAuth,noteController.achiveNote);







export default router;