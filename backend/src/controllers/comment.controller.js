import { CommentModel } from '../models/Comment.js';
import { PostModel } from '../models/Post.js';
import { isAuthor } from './post.controller.js';

export const ctrlCreateComment = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;

  const isPostAuthor = await isAuthor({ postId, userId });

  if (!isPostAuthor) {
    return res.status(403).json({ error: 'User is not the post author' });
  }

  try {
    const comment = new CommentModel({
      ...req.body,
      post: postId,
    });

    await comment.save();

    await PostModel.findOneAndUpdate(
      { _id: postId },
      { $push: { comment: comment._id } }
    );

    res.status(201).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Couldn't create comment" });
  }
};

export const ctrlListComments = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;

  const isPostAuthor = await isAuthor({ postId, userId });

  if (!isPostAuthor) {
    return res.status(403).json({ error: 'User is not the post author' });
  }

  try {
    const comments = await CommentModel.find({ post: postId }, [
      '-__v',
    ]).populate('post', ['-comment', '-author', '-__v']);

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Couldn't get post" });
  }
};

export const ctrlGetCommentById = async (req, res) => {
  const { commentId, postId } = req.params;
  const userId = req.user._id;

  const isPostAuthor = await isAuthor({ postId, userId });

  if (!isPostAuthor) {
    return res.status(403).json({ error: 'User is not the post author' });
  }

  try {
    const comment = await CommentModel.findOne({
      _id: commentId,
      post: postId,
    }).populate('post');

    if (!comment) return res.status(404).json({ error: "Comment doesn't exist" });

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Couldn't get comment" });
  }
};

export const ctrlUpdateComment = async (req, res) => {
  const { commentId, postId } = req.params;
  const userId = req.user._id;

  const ispostAuthor = await isAuthor({ postId, userId });

  if (!isPostAuthor) {
    return res.status(403).json({ error: 'User is not the post author' });
  }

  try {
    const comment = await CommentModel.findOne({ _id: commentId });

    if (!comment) {
      return res.status(404).json({ error: "Comment doesn't exist" });
    }

    comment.set(req.body);

    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Couldn't update comment" });
  }
};

export const ctrlDeleteComment = async (req, res) => {
  const { commentId, postId } = req.params;
  const userId = req.user._id;

  const isPostAuthor = await isAuthor({ postId, userId });

  if (!isPostAuthor) {
    return res.status(403).json({ error: 'User is not the post author' });
  }

  try {
    await CommentModel.findOneAndDelete({ _id: commentId, post: postId });

    await PostModel.findOneAndUpdate(
      { _id: postId },
      { $pull: { comments: commentId } }
    );

    res.status(200).json();
  } catch (error) {
    res.status(500).json({ error: "Couldn't delete comment" });
  }
};