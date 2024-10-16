import dbConnection from "../db/DBConnect.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getBooks = async (req, res) => {
  const { page = 1, limit = 10, genre, author } = req.query;

  const offset = (page - 1) * limit;
  let query = "SELECT * FROM Book";
  const params = [];

  if (genre || author) {
    query += " WHERE";
    if (genre) {
      query += " genre = ?";
      params.push(genre);
    }
    if (author) {
      query += genre ? " AND" : "";
      query += " author = ?";
      params.push(author);
    }
  }

  query += " LIMIT ? OFFSET ?";
  params.push(Number(limit), Number(offset));

  try {
    dbConnection.query(query, params, (err, books) => {
      if (err) {
        return res
          .status(500)
          .json(new ApiError(500, "Failed to fetch books", [err.message]));
      }

      const countQuery =
        "SELECT COUNT(*) AS total FROM Book" +
        (genre || author
          ? " WHERE" +
            (genre ? " genre = ?" : "") +
            (author ? " AND author = ?" : "")
          : "");
      const countParams = genre || author ? params.slice(0, -2) : [];

      dbConnection.query(countQuery, countParams, (countErr, countResults) => {
        if (countErr) {
          return res
            .status(500)
            .json(
              new ApiError(500, "Failed to fetch total count", [
                countErr.message,
              ])
            );
        }

        const totalBooks = countResults[0]?.total || 0;
        res.status(200).json(
          new ApiResponse(200, {
            currentPage: page,
            totalPages: Math.ceil(totalBooks / limit),
            totalBooks,
            books,
          })
        );
      });
    });
  } catch (error) {
    res
      .status(500)
      .json(new ApiError(500, "Failed to fetch books", [error.message]));
  }
};

const addNewBook = async (req, res) => {
  const { indx, title, author, genre, publicationYear } = req.body;

  const query =
    "INSERT INTO Book (indx, title, author, genre, publicationYear) VALUES (?, ?, ?, ?, ?)";
  const params = [indx, title, author, genre, publicationYear];

  try {
    dbConnection.query(query, params, (err, result) => {
      if (err) {
        return res
          .status(400)
          .json(new ApiError(400, "Failed to add book", [err.message]));
      }

      res
        .status(201)
        .json(
          new ApiResponse(
            201,
            { indx, title, author, genre, publicationYear },
            "Book added successfully"
          )
        );
    });
  } catch (error) {
    res
      .status(400)
      .json(new ApiError(400, "Failed to add book", [error.message]));
  }
};

const updateBookById = async (req, res) => {
  const { indx } = req.params;
  const updateData = req.body;

  const query =
    "UPDATE Book SET title = ?, author = ?, genre = ?, publicationYear = ? WHERE indx = ?";
  const params = [
    updateData.title,
    updateData.author,
    updateData.genre,
    updateData.publicationYear,
    indx,
  ];

  try {
    dbConnection.query(query, params, (err, result) => {
      if (err) {
        return res
          .status(400)
          .json(new ApiError(400, "Failed to update book", [err.message]));
      }

      if (result.affectedRows === 0) {
        return res.status(404).json(new ApiError(404, "Book not found"));
      }

      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { indx, ...updateData },
            "Book updated successfully"
          )
        );
    });
  } catch (error) {
    res
      .status(400)
      .json(new ApiError(400, "Failed to update book", [error.message]));
  }
};

const deleteBookById = async (req, res) => {
  const { indx } = req.params;

  const query = "DELETE FROM Book WHERE indx = ?";
  const params = [indx];

  try {
    dbConnection.query(query, params, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json(new ApiError(500, "Failed to delete book", [err.message]));
      }

      if (result.affectedRows === 0) {
        return res.status(404).json(new ApiError(404, "Book not found"));
      }

      res
        .status(200)
        .json(new ApiResponse(200, { indx }, "Book deleted successfully"));
    });
  } catch (error) {
    res
      .status(500)
      .json(new ApiError(500, "Failed to delete book", [error.message]));
  }
};

export default { getBooks, addNewBook, updateBookById, deleteBookById };
