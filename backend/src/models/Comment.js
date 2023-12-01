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



/* import { Schema, model } from 'mongoose';

const CommentSchema = new mongoose.Schema({
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      required: true,
    },
  });
  
  export const CommentModel = model('Comment', CommentSchema); */