const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://aryapradeep212:Arya@cluster0.zbd2evl.mongodb.net/?retryWrites=true&w=majority");

let Schema = mongoose.Schema;

const bookSchema = new Schema({
    bookno: {
      type: Number,
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
    isbn: {
      type: String,
      unique: true,
      required: true,
    },
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
      enum: ["Available", "Rented", "Sold"],
      default: "Available",
    },
    img:{
      type:String,
      required:true
    }
  });

  const bookModel = mongoose.model("books", bookSchema);

  module.exports =bookModel;

