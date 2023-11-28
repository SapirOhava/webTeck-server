const mongoose = require('mongoose');
const { Schema } = mongoose;

// To create a flexible reference in your Mongoose schema that can link a post either to a User or a Group, you can use the refPath feature. This approach allows the reference in the associatedWith field to dynamically switch between referencing the User model and the Group model based on the value of another field in the same document (in this case, onModel).
// The onModel field will store the name of the model that the post is associated with (either 'User' or 'Group'), and associatedWith will then reference the ID of the specific user or group. Here's how you can implement this:

const postSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  associatedWith: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'onModel',
  },
  onModel: {
    type: String,
    required: true,
    enum: ['User', 'Group'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  //   visibility: {
  //     type: String,
  //     enum: ['Public', 'Friends', 'Private'],
  //     default: 'Public',
  //   },
  //   contentType: {
  //     type: String,
  //     enum: ['Text', 'Image', 'Video'],
  //     required: true,
  //   },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
