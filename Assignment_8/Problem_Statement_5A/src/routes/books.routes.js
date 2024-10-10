import express from "express";
import authenticateAdmin from "../middlewares/auth.middleware.js";
import bookController from "../controllers/book.controller.js";

const { getBooks, addNewBook, updateBookById, deleteBookById } = bookController;

const router = express.Router();

router.get("/getBooks", (req, res) => {
  getBooks(req, res);
});

router.post("/addBook", authenticateAdmin, (req, res) => {
  addNewBook(req, res);
});

router.patch("/updateBook/:indx", authenticateAdmin, (req, res) => {
  updateBookById(req, res);
});

router.delete("/deleteBook/:indx", authenticateAdmin, (req, res) => {
  deleteBookById(req, res);
});

export default router;
