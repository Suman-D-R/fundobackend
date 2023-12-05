import Note from '../models/note.model';

export const addNote = async (noteContent) => {
  const data = await Note.create(noteContent);
  return data;
};

export const getAllNotes = async () => {
    try {
        const allNotes = await Note.find({});
        return allNotes;
    } catch (error) {
        throw new Error('Error fetching all notes: ' + error.message);
    }
};

export const updateNote = async (noteContent) => {
    try {
      const data = await Note.findById(noteContent._id);
      console.log(data);
      if (!data) {
        throw new Error('Note note found');
      }
  
      data.title = noteContent.title;
      data.description = noteContent.description;
  
      const result = await data.save();
  
      return result;
    } catch (error) {
      throw new Error('Error  updating note: ' + error.message);
    }
  };

export const deleteNote = async (noteContent) => {
  try {
    const data = await Note.findById(noteContent._id);
    console.log(data);
    if (!data) {
      throw new Error('Note note found');
    }

    data.isDeleted = !data.isDeleted;

    const result = await data.save();

    return result;
  } catch (error) {
    throw new Error('Error  deleting note: ' + error.message);
  }
};

export const achiveNote = async (noteContent) => {
  try {
    const data = await Note.findById(noteContent._id);
    console.log(data);
    if (!data) {
      throw new Error('Note note found');
    }

    data.isAchive = !data.isAchive;

    const result = await data.save();

    return result;
  } catch (error) {
    throw new Error('Error  achiving note: ' + error.message);
  }
};



export const deleteforever = async (noteContent) => {
    try {
      const data = await Note.findById(noteContent._id);
      console.log(data);
      if (!data) {
        throw new Error('Note note found');
      }
  
      const result = await data.remove();
  
      return result;
    } catch (error) {
      throw new Error('Error  achiving note: ' + error.message);
    }
  };