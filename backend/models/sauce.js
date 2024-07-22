const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: [String], required: true, default: [] }, // Array of user IDs who liked the sauce
  usersDisliked: { type: [String], required: true, default: [] } // Array of user IDs who disliked the sauce
});

module.exports = mongoose.model('Sauce', sauceSchema);
