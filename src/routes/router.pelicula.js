import { Router } from 'express'
import { actualizarUnaPelicula, crearNuevaPelicula, obtenerTodasLasPeliculas, softBorrarPelicula } from '../controllers/pelicula.controller.js';

const router = Router();

router.post('/peliculas', crearNuevaPelicula );
router.get('/peliculas', obtenerTodasLasPeliculas);
router.put('/peliculas/:id', actualizarUnaPelicula)
router.put('/peliculas/delete/:id', softBorrarPelicula)

export default router;