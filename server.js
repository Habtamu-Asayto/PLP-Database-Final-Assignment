const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const mysqlPool = require("./config/db");
//rest object
const app = express();

//routes for author
app.use("/api/v1/author", require("./routes/authorRoutes"));

//routes for book
app.use("/api/v1/book", require("./routes/bookRoutes"));

//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

//Insert Author
app.post("/api/v1/author/create", async (req, res) => {
  try {
    const { id, name } = req.body;
    if (!id || !name) {
      return res.status(400).json({
        success: false,
        message: "Please provide required fields",
      });
    }
    const data = await mysqlPool.query("INSERT INTO authors VALUES (?, ?)", [
      id,
      name,
    ]);
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "Failed to create author",
      });
    }
    res.status(201).json({
      success: true,
      message: "Author created successfully",
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in creating author",
      error,
    });
  }
});

//Insert a Book
app.post("/api/v1/book/create", async (req, res) => {
  try {
    const { id, title, isbn, year, AuthorId } = req.body;
    if (!id || !title || !isbn || !year || !AuthorId) {
      return res.status(400).json({
        success: false,
        message: "Please provide required fields",
      });
    }
    const data = await mysqlPool.query(
      "INSERT INTO books VALUES (?, ?, ?,?,?)",
      [id, title, isbn, year, AuthorId]
    );
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "Failed to create a book",
      });
    }
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in creating a book",
      error,
    });
  }
});

//Update Author
app.put("/api/v1/author/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide author ID",
      });
    }
    const { name } = req.body;
    const data = await mysqlPool.query(
      "UPDATE authors SET name = ? WHERE id = ?",
      [name, id]
    );
    if (!data) {
      return res
        .status(500)
        .send({ success: false, message: "Error occured " });
    }
    res.status(201).send({
      success: true,
      message: "Author updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in updating Author",
      error,
    });
  }
});

//Delete Author
app.delete("/api/v1/author/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide author ID",
      });
    }
    const data = await mysqlPool.query("DELETE FROM authors WHERE id = ?", [
      id,
    ]);
    if (!data) {
      return res
        .status(500)
        .send({ success: false, message: "Error occured " });
    }
    res.status(200).send({
      success: true,
      message: "Author deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in deleting author ",
      error,
    });
  }
});

//Update a book
app.put("/api/v1/book/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide book ID",
      });
    }
    const { title, isbn, year, AuthorId } = req.body;
    const data = await mysqlPool.query(
      "UPDATE books SET title = ?, isbn = ?, year = ?, AuthorId = ? WHERE id = ?",
      [title, isbn, year, AuthorId, id]
    );
    if (!data) {
      return res
        .status(500)
        .send({ success: false, message: "Error occured " });
    }
    res.status(201).send({
      success: true,
      message: "Book updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in updating a book",
      error,
    });
  }
});

//Delete a book
app.delete("/api/v1/book/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide book ID",
      });
    }
    const data = await mysqlPool.query("DELETE FROM books WHERE id = ?", [id]);
    if (!data) {
      return res
        .status(500)
        .send({ success: false, message: "Error occured " });
    }
    res.status(200).send({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in deleting a book",
      error,
    });
  }
});
//routes
app.get("/home", (req, res) => {
  res.status(200).send("<h1>Welcome to Home Page</h1>");
});

//port
const PORT = 8080;

//conditionally listen
mysqlPool
  .query("SELECT 1")
  .then(() => {
    console.log("Database connected successfully".bgCyan.white);
    //listen
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`.bgGreen.white);
    });
  })
  .catch((err) => {
    console.log("Database connection failed".bgRed.white);
    console.log(err);
  });
