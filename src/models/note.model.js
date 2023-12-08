import { Schema, model } from 'mongoose';

const noteSchema = new Schema({
  user_id: {
    type: String
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  isAchive: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false

  },
  color: {
    type: String,
  }
});

export default model('Note', noteSchema);
