import express from 'express';
import  peliculas from './routes/router.pelicula.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api/v1', peliculas);

app.use(errorHandler)
app.listen(PORT, () => {
    console.log('El servidor esta arriba 💀')
})