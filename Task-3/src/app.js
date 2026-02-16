import express from 'express';
import morgan from 'morgan';
import bookRoutes from './routes/bookRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Welcome to the BookStore API')
})

app.use('/books', bookRoutes)

export default app;