const mongoose = require("mongoose");
//Define a schema
const Schema = mongoose.Schema;
const PostSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  body: {
    type: String,
    trim: true,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
});
module.exports = mongoose.model("Post", PostSchema);
