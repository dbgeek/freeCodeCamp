const mongoose = require('mongoose');

const StockLikesSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  symbol: {
    type: String,
    index: true,
    unique: true,
    require: true,
  },
  ipAddress: [
    {
      type: String,
    },
  ],
  likes: {
    type: Number,
    default: 0,
  },
});

const stockLikesModule = mongoose.model('stockLikes', StockLikesSchema);

module.exports = stockLikesModule;
