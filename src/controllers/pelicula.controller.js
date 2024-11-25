import { NotFoundError } from "../errors/typesError.js";
import { Pelicula } from "../models/Pelicula.model.js";

export const crearNuevaPelicula = async (req, res, next) => {

  try {
    const data = req.body;
    const pelicula = await Pelicula.crear(data);

    res.status(201).json({
      message: "Película creada con éxito",
      status: 201,
      data: pelicula,
    });
  } catch (error) {
    next(error);
  }
};

export const obtenerTodasLasPeliculas = async (req, res) => {

  try {
    const data = await Pelicula.encontrarPeliculas();

    if (!data)
      throw new NotFoundError("No existen los datos , No se encontraron los datos solictadoes en la ruta correspondiente"
      );

    res.status(200).json({
      message: "Películas Encontradas!",
      status: 200,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const actualizarUnaPelicula = async (req, res, next) => {

  try {
    const id = req.params.id;
    const dataPelicula = req.body;

    const peliculaActualizada = await Pelicula.actualizarPelicula(id, dataPelicula);

    res.status(201).json({
      message: "Película Actualizada",
      status: 201,
      oldData: peliculaActualizada,
      newData: dataPelicula,
    });
  } catch (error) {
    next(error);
  }
};

export const softBorrarPelicula = async (req, res, next) => {

  try {
    const { id } = req.params;
    await Pelicula.borrarPelicula(id);

    res.status(200).json({
      message: "Película eliminada con éxito",
      status: 200,
    });
  } catch (error) {
   next(error);
  }
};

export const obtenerTodasPeliculasActivas = async (req, res, next) => {

  try {
    const peliculaActive = await Pelicula.obtenerPeliculasActivas();

    res.status(200).json({
      message: "Películas activas obtenidas con éxito",
      status: 200,
      data: peliculaActive,
    });
  } catch (error) {
    next(error);
  }
};

export const obtenerPeliculaBuscandoPorId = async (req, res, next) => {

  try {
    const { id } = req.params;
    const data = await Pelicula.encontrarPeliculaPorId(id);

    if (!data)
      throw new NotFoundError(
        "La data se encuentra vacía",
        `No encontramos el id: ${id}`
      );

    res.status(200).json({
      messsage: "Película encontrada pot ID",
      status: 200,
      data,
    });
  } catch (error) {
    next(error);
  }
};

//falta encontrar por nombre cuando mas de una peli se llaman igual
export const obtenerPeliculaPorNombre = async (req, res, next) => { 

  try {
    
    const { nombre } = req.query;
    const pelicula = await Pelicula.encontrarPeliculaPorNombre(nombre);

    res.status(200).json({
      message: "Película obtenida por nombre  con éxito",
      status: 200,
      data: pelicula,
    });
  
  } catch (error) {
    next(error);
  }
};

export const obtenerPeliculaPorDirector = async (req, res, next) => {

  try {
    const { director } = req.params;
    const pelicula = await Pelicula.encontrarPeliculaDirector(director);

    res.status(200).json({
      message: "Película obtenidas por director con éxito  ",
      status: 200,
      data: pelicula,
    });
  } catch (error) {
    next(error);
  }
};
