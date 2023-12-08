import Note from '../models/note.model';

export const addNote = async (noteData,userId) => {
  noteData.user_id = userId;
  const data = await Note.create(noteData);
  return data;
};

export const getAllNotes = async (userId) => {
    try {
      const data = await Note.find({ user_id: userId });
      return data;
    } catch (error) {
        throw new Error('Error fetching all notes: ' + error.message);
    }
};

export const getNotes = async (noteId) => {
  try {
    const data = await Note.findById(noteId);
    return data;
  } catch (error) {
      throw new Error('Error fetching all notes: ' + error.message);
  }
};

export const updateNote = async (noteId, updatedData) => {
    try {
      const data = await Note.findByIdAndUpdate(noteId, updatedData, { new: true });
      return data;
    } catch (error) {
      throw new Error('Error  updating note: ' + error.message);
    }
  };

export const deleteNote = async (noteId) => {
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

    return updatedData;
    // return data;

  } catch (error) {
    throw new Error('Error  deleting note: ' + error.message);
  }
};

export const achiveNote = async (noteId) => {
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

    return updatedData;
  } catch (error) {
    throw new Error('Error  achiving note: ' + error.message);
  }
};



export const deleteforever = async (noteId) => {
    try {
      const data = await Note.findByIdAndDelete(noteId);
  
      return data;
    } catch (error) {
      throw new Error('Error  achiving note: ' + error.message);
    }
  };