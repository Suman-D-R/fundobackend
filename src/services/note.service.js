import Note from '../models/note.model';
import { client } from '../config/redis';

export const addNote = async (noteData, userId) => {
  try {
    noteData.user_id = userId;

    const data = await Note.create(noteData);

    if (!data) {
      throw new Error('Error creating note. Note data may be invalid.');
    }

    // await client.del(userId);

    return data;
  } catch (error) {
    throw new Error('Add note error: ' + error.message);
  }
};

export const getAllNotes = async (userId) => {
  try {
    // console.log(userId);
    const data = await Note.find({ user_id: userId });
    // client.set(userId, JSON.stringify(data));
    return data;
  } catch (error) {
    throw new Error('Error fetching all notes: ' + error.message);
  }
};

export const getNotes = async (noteId, userId) => {
  try {
    const data = await Note.findById(noteId);
    // client.set(userId, JSON.stringify(data));
    return data;
  } catch (error) {
    throw new Error('Error fetching all notes: ' + error.message);
  }
};

export const updateNote = async (noteId, updatedData, userId) => {
  try {
    const data = await Note.findByIdAndUpdate(noteId, updatedData, {
      new: true
    });
    // await client.del(userId);
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
    // await client.del(userId);
    return updatedData;
    // return data;
  } catch (error) {
    throw new Error('Error  deleting note: ' + error.message);
  }
};

export const achiveNote = async (noteId, userId) => {
  try {
    const currentNote = await Note.findById(noteId);

    if (!currentNote) {
      throw new Error('Note not found');
    }
    console.log('hello', currentNote);
    const updatedData = await Note.findOneAndUpdate(
      { _id: noteId },
      { $set: { isAchive: !currentNote.isAchive } },
      { new: true }
    );

    // await client.del(userId);
    return updatedData;
  } catch (error) {
    throw new Error('Error  achiving note: ' + error.message);
  }
};

export const colorNote = async (noteId, data) => {
  try {
    const currentNote = await Note.findById(noteId);

    if (!currentNote) {
      throw new Error('Note not found');
    }
    const updatedData = await Note.findOneAndUpdate(
      { _id: noteId },
      { $set: { color: data.color } },
      { new: true }
    );

    // await client.del(userId);
    return updatedData;
  } catch (error) {
    throw new Error('Error  achiving note: ' + error.message);
  }
};

export const deleteforever = async (noteId, userId) => {
  try {
    const data = await Note.findByIdAndDelete(noteId);
    // await client.del(userId);
    return data;
  } catch (error) {
    throw new Error('Error  achiving note: ' + error.message);
  }
};
