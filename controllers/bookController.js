const mysqlPool = require("../config/db");
//Get All books
const getBooks = async (req, res) => {
  try {
    const data = await mysqlPool.query("SELECT * FROM books");
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "No books found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in getting books",
      error: error,
    });
  }
};

//Get Book by ID
const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await mysqlPool.query("SELECT * FROM books WHERE id = ?", [
      id,
    ]);
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "No book found with the given ID",
      });
    }
    res.status(200).json({
      success: true,
      message: "Book fetched successfully",
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in getting book by ID",
      error: error,
    });
  }
}; 

module.exports = { getBooks, getBookById };
