import express from 'express';
import { getAllBooks, createBook, deleteBook, searchBookRoute, getBookById } from '../controllers/bookController.js';
const router = express.Router();

router.get('/search', searchBookRoute);

router.get('/:id', getBookById);

router.get('/books', getAllBooks);

router.post('/books', createBook);

router.delete('/books/:id', deleteBook);

export default router;