import { Schema, model } from 'mongoose';

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  imageURL: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const PostModel = model('Post', PostSchema);