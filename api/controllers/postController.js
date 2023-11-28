const Post = require('../models/Post');
const Group = require('../models/Group');

exports.createPost = async (req, res) => {
  try {
    const { content, associatedWith, onModel } = req.body;
    const userId = req.user.id;

    if (!['User', 'Group'].includes(onModel)) {
      return res.status(400).json({ message: 'Invalid post type' });
    }
    if (onModel === 'User') {
      if (associatedWith != userId) {
        return res.status(404).json({
          message: 'User cant post for other users',
        });
      }
    }
    if (onModel === 'Group') {
      const group = await Group.findById(associatedWith);
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }
      const isMember = group.members.some((member) => member.equals(userId));
      if (!isMember) {
        return res
          .status(403)
          .json({ message: 'User is not a member of the group' });
      }
    }

    const newPost = new Post({
      content,
      createdBy: userId,
      associatedWith,
      onModel,
    });

    await newPost.save();

    res
      .status(201)
      .json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
