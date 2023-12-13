import Note from '../models/note.model';
import { client } from '../config/redis';

export const addNote = async (noteData,userId) => {
  noteData.user_id = userId;
  const data = await Note.create(noteData);
  client.set(userId, JSON.stringify(data));
  return data;
};

export const getAllNotes = async (userId) => {
  try {

      const data = await Note.find({ user_id: userId });

      client.set(userId, JSON.stringify(data));

      console.log("Data retrieved from the database");

      return data;
  } catch (error) {
      throw new Error('Error fetching all notes: ' + error.message);
  }
};

export const getNotes = async (noteId,userId) => {
  try {
    const data = await Note.findById(noteId);
    client.set(userId, JSON.stringify(data));
    return data;
  } catch (error) {
      throw new Error('Error fetching all notes: ' + error.message);
  }
};

export const updateNote = async (noteId, updatedData, userId) => {
    try {
      const data = await Note.findByIdAndUpdate(noteId, updatedData, { new: true });
      client.set(userId, JSON.stringify(data));
      return data;
    } catch (error) {
      throw new Error('Error  updating note: ' + error.message);
    }
  };

export const deleteNote = async (noteId, userId) => {
  try {
    const currentNote = await Note.findById(noteId);
    
    if (!currentNote) {
      throw new Error('Note not found');
    }

    const updatedData = await Note.findByIdAndUpdate(
      noteId,
      { isDeleted: !currentNote.isDeleted },
      { new: true }
    );
    client.set(userId, JSON.stringify(updatedData));
    return updatedData;
    // return data;

  } catch (error) {
    throw new Error('Error  deleting note: ' + error.message);
  }
};

export const achiveNote = async (noteId,userId) => {
  try {
    const currentNote = await Note.findById(noteId);

    if (!currentNote) {
      throw new Error('Note not found');
    }

    const updatedData = await Note.findByIdAndUpdate(
      noteId,
      { isArchive: !currentNote.isArchive },
      { new: true }
    );
    client.set(userId, JSON.stringify(updatedData));
    return updatedData;
  } catch (error) {
    throw new Error('Error  achiving note: ' + error.message);
  }
};



export const deleteforever = async (noteId,userId) => {
    try {
      const data = await Note.findByIdAndDelete(noteId);
      client.set(userId, JSON.stringify(data));
      return data;
    } catch (error) {
      throw new Error('Error  achiving note: ' + error.message);
    }
  };