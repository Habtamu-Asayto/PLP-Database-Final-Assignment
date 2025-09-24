const mysqlPool = require("../config/db");
//Get All books
const getAuthors = async (req, res) => {
  try {
    const data = await mysqlPool.query("SELECT * FROM Authors");
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "No Authors found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Authors fetched successfully",
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in getting Authors",
      error: error,
    });
  }
};

//Get Book by ID
const getAuthorById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await mysqlPool.query("SELECT * FROM Authors WHERE id = ?", [
      id,
    ]);
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "No Author found with the given ID",
      });
    }
    res.status(200).json({
      success: true,
      message: "Author fetched successfully",
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in getting Author by ID",
      error: error,
    });
  }
};

module.exports = { getAuthors, getAuthorById };
