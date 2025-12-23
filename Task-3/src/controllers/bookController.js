import { bookSchema } from '../utils/validationSchema.js'; 


let books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 15.99 },
    { id: 2, title: "Applied Mathematics", author: "Begahsaw Maltot", price: 122.50 }
];

// Helper to generate IDs
let nextId = books.length + 1;

const getAllBooks = (req, res) => {
    res.status(200).json(books);
};

const searchBookRoute = (req, res) => {
    res.status(200).send("You are on the search page");
};

const getBookById = (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ message: 'Book not found.' });
    }
    res.status(200).json(book);
};

const createBook = (req, res) => {
    const { body } = req;

    const { error } = bookSchema.validate(body);

    if (error) {
        return res.status(400).json({ 
            message: 'Validation failed', 
            details: error.details.map(d => d.message)
        });
    }

    const newBook = {
        id: nextId++,
        title: body.title,
        author: body.author,
        price: body.price
    };
    
    books.push(newBook);

    res.status(201).json({ message: 'Book created successfully', book: newBook });
};

const deleteBook = (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = books.length;
    
    books = books.filter(b => b.id !== id);

    if (books.length === initialLength) {
        return res.status(404).json({ message: 'Book not found.' });
    }

    res.status(200).json({ message: `Book with ID ${id} deleted successfully` });
};

export { 
    getAllBooks, 
    searchBookRoute, 
    getBookById, 
    createBook, 
    deleteBook
};