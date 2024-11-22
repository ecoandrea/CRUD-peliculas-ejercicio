import { Router } from 'express'
import { actualizarUnaPelicula, crearNuevaPelicula, obtenerTodasLasPeliculas } from '../controllers/pelicula.controller.js';

const router = Router();

router.post('/peliculas', crearNuevaPelicula );
router.get('/peliculas', obtenerTodasLasPeliculas);
router.put('/peliculas/:id', actualizarUnaPelicula)

export default router;