const express = require("express");
const {
  getAuthors,
  getAuthorById,
} = require("../controllers/authorController");
const router = express.Router();

//Get all books
router.get("/getall", getAuthors);

//Get book by ID
router.get("/get/:id", getAuthorById);

//Create a book
//Check it in server.js

//Update a book
////Check it in server.js

//Delete a book

module.exports = router;
