import {Pelicula} from '../models/Pelicula.model.js'

export const crearNuevaPelicula = async (req, res) => { // falta next
try {
    const data = req.body
    const pelicula = await Pelicula.crear(data)

    res.status(201).json({
        message: 'Pelicula creada con éxito',
        status: 201,
        data: pelicula
    })
} catch (error) {
    res.status(500).json({
        message: 'Error al obtener las peliculas',
        status: 500,
        error,
    });
}
}

export const obtenerTodasLasPeliculas = async(req, res) => {
    try {
        const data = await Pelicula.encontrarPeliculas();

        if(!data) throw new Error('No existen los datos', `No se encontraron los datos solictadoes en la ruta correspondiente`)

        res.status(200).json({
            message: 'Peliculas Encontrados!',
            status: 200,
            data
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener las peliculas',
            status: 500,
            error,
        });
    }
}