import { Router } from "express";
import {
  actualizarUnaPelicula,
  crearNuevaPelicula,
  obtenerPeliculaBuscandoPorId,
  obtenerPeliculaPorDirector,
  obtenerPeliculaPorNombre,
  obtenerTodasLasPeliculas,
  obtenerTodasPeliculasActivas,
  softBorrarPelicula,
} from "../controllers/pelicula.controller.js";

const router = Router();

router.post("/peliculas", crearNuevaPelicula);
router.get("/peliculas", obtenerTodasLasPeliculas);
router.get("/peliculas/active", obtenerTodasPeliculasActivas);
router.get("/peliculas/id/:id", obtenerPeliculaBuscandoPorId);
router.get("/peliculas/nombre/:nombre", obtenerPeliculaPorNombre);
router.get("/peliculas/director/:director", obtenerPeliculaPorDirector);
router.put("/peliculas/:id", actualizarUnaPelicula);
router.put("/peliculas/delete/:id", softBorrarPelicula);

export default router;
