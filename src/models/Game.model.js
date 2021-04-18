const {
  Schema,
  model
} = require("mongoose");

const GameSchema = new Schema({
  name: {
    type: String,
    lowercase: true
  },
  description: {
    type: String
  },
  image_url: {
    type: String
  },
  price: {
    type: Number
  },
  rating: {
    type: Number,
    min: 0,
    max: 10
  },
  downloaded_times: {
    type: Number,
    default: 0
  },
  view_times: {
    type: Number,
    default: 0
  },
  partial_discount: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  status: {
    type: String,
    default: 'active'
  }
});

module.exports = model("Game", GameSchema);
