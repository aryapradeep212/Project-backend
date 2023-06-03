const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://aryapradeep212:Arya@cluster0.zbd2evl.mongodb.net/?retryWrites=true&w=majority')

let Schema = mongoose.Schema;

const bookSchema = new Schema({
  isbn: {
    type: String,
    unique: true,
    required: true,
  },
    bookname: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    borrowedBy:[{
      type:Schema.Types.ObjectId,
      ref:"users",
    }],
    publicationYear: {
      type: String,
      required: true,
    },
    price:{
      type:Number,
      required:true
    },
    description: String,
    status: {
      type: String,
      enum: ["Available", "Rented"],
      default: "Available",
    },
  });

  const bookModel = mongoose.model("books", bookSchema);

  module.exports =bookModel;

