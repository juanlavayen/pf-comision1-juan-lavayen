import { PostModel } from '../models/Post.js';
import { CommentModel } from '../models/Comment.js';

export const ctrlCreatePost = async (req, res) => {
  const userId = req.user._id;

  try {
    const { title } = req.body;

    const post = new PostModel({
      title,
      description,
      author: userId,
      comments,
      imageURL,
      createAt

    });

    await post.save();

    return res.status(201).json(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const ctrlListPost = async (req, res) => {
  const userId = req.user._id;

  try {
    const posts = await PostModel.find({ author: userId })
      .populate('author', ['username', 'avatar'])
      .populate('comments', ['name', 'artist', 'year']);

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const ctrlGetPost = async (req, res) => {
  const userId = req.user._id;
  const { PostId } = req.params;

  try {
    const post = await PostModel.findOne({
      _id: postId,
      author: userId,
    })
      .populate('author', ['username', 'avatar'])
      .populate('comments', ['name', 'artist', 'year']);

    if (!post) {
      return res.status(404).json({ error: 'Pots not found' });
    }

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const ctrlUpdatePost = async (req, res) => {
  const userId = req.user._id;
  const { postId } = req.params;

  try {
    const post = await PostModel.findOne({
      _id: postId,
      author: userId,
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.set(req.body);

    await post.save();

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const ctrlDeletePost = async (req, res) => {
  const userId = req.user._id;
  const { postId } = req.params;

  try {
    const post = await PostModel.findOne({
      _id: postId,
      author: userId,
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    await CommentModel.deleteMany({ _id: { $in: post.coments } });

    await PostModel.findOneAndDelete({
      _id: postId,
      author: userId,
    });

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const isAuthor = async ({ postId, userId }) => {
  try {
    const post = await PostModel.findOne({
      _id: postId,
      author: userId,
    });

    if (!post) {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};