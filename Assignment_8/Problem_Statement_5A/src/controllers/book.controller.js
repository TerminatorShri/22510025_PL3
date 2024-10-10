import { Book } from "../models/book.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getBooks = async (req, res) => {
  const { page = 1, limit = 10, genre, author } = req.query;

  try {
    const query = {};
    if (genre) query.genre = genre;
    if (author) query.author = author;

    const books = await Book.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const totalBooks = await Book.countDocuments(query);

    res.status(200).json(
      new ApiResponse(200, {
        currentPage: page,
        totalPages: Math.ceil(totalBooks / limit),
        totalBooks,
        books,
      })
    );
  } catch (error) {
    res
      .status(500)
      .json(new ApiError(500, "Failed to fetch books", [error.message]));
  }
};

const addNewBook = async (req, res) => {
  try {
    const { indx, title, author, genre, publicationYear } = req.body;

    const newBook = new Book({ indx, title, author, genre, publicationYear });
    await newBook.save();

    res
      .status(201)
      .json(new ApiResponse(201, newBook, "Book added successfully"));
  } catch (error) {
    res
      .status(400)
      .json(new ApiError(400, "Failed to add book", [error.message]));
  }
};

const updateBookById = async (req, res) => {
  const { indx } = req.params;
  const updateData = req.body;

  try {
    const updatedBook = await Book.findOneAndUpdate(
      { indx: indx },
      updateData,
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json(new ApiError(404, "Book not found"));
    }

    res
      .status(200)
      .json(new ApiResponse(200, updatedBook, "Book updated successfully"));
  } catch (error) {
    res
      .status(400)
      .json(new ApiError(400, "Failed to update book", [error.message]));
  }
};

const deleteBookById = async (req, res) => {
  const { indx } = req.params;

  try {
    const deletedBook = await Book.findOneAndDelete({ indx: indx });

    if (!deletedBook) {
      return res.status(404).json(new ApiError(404, "Book not found"));
    }

    res
      .status(200)
      .json(new ApiResponse(200, deletedBook, "Book deleted successfully"));
  } catch (error) {
    res
      .status(500)
      .json(new ApiError(500, "Failed to delete book", [error.message]));
  }
};

export default { getBooks, addNewBook, updateBookById, deleteBookById };
