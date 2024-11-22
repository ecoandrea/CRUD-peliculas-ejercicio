import express from 'express';
import  pelicula from './routes/router.pelicula.js';

const app = express();
const PORT = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api/v1', pelicula);


app.listen(PORT, () => {
    console.log('El servidor esta arriba 💀')
})