import { Schema, model } from 'mongoose';

const CommentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  description: {
    type: String,
  },
});

export const CommentModel = model('Comment', CommentSchema);

