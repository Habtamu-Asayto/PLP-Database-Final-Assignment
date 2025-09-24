const express = require("express");
const {
  getBooks,
  getBookById 
} = require("../controllers/bookController");
const router = express.Router();

//Get all books
router.get("/getall", getBooks);

//Get book by ID
router.get("/get/:id", getBookById);

//Create a book
//Check it in server.js

//Update a book
////Check it in server.js

//Delete a book

module.exports = router;
