import { Router } from 'express'
import { crearNuevaPelicula, obtenerTodasLasPeliculas } from '../controllers/pelicula.controller.js';

const router = Router();

router.post('/pelicula', crearNuevaPelicula );
router.get('/pelicula', obtenerTodasLasPeliculas);

export default router;