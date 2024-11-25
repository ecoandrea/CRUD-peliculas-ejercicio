import { v4 as uuidv4 } from 'uuid';
import { createDataFile, getAllActivePelicula, getAllData, getPeliculaByDirector, getPeliculaById, getPeliculaByNombre, softDeletePelicula, updatePelicula } from '../utils/fileUtils.js';
import { ValidacionPelicula } from '../utils/Validaciones.js';
import { InternalServerError, ValidationError } from '../errors/typesError.js';

export class Pelicula {
    #id;
    #nombre;
    #anio;
    #director;
    #duracion;
    #active;

    constructor(nombre, anio, director, duracion) {
        this.#id = uuidv4().slice(0, 8); // para que quede id de 4 caracteres
        this.#nombre = ValidacionPelicula.nombrePelicula(nombre);   // Cambié a nombrePelicula
        this.#anio = ValidacionPelicula.anioPelicula(anio);        // Cambié a anioPelicula
        this.#director = ValidacionPelicula.nombreDirectorPelicula(director);  // Cambié a nombreDirectorPelicula
        this.#duracion = ValidacionPelicula.duracionPelicula(duracion);        // Cambié a duracionPelicula
        this.#active = true;
    }

    get id() {
        return this.#id;
    }

    get nombre() {
        return this.#nombre;
    }

    get anio() {
        return this.#anio;
    }

    get director() {
        return this.#director;
    }

    get duracion() {
        return this.#duracion;
    }

    get active() {
        return this.#active;
    }

    setId(newId) {
        this.#id = newId;
    }

    setNombre(newNombre) {
        try {
            ValidacionPelicula.nombre(newNombre);
            this.#nombre = newNombre;
        } catch (error) {
            throw new ValidationError(`Error al modificar nombre: ${error.message}`, error);
        }
    }

    setAnio(newAnio) {
        try {
            ValidacionPelicula.anio(newAnio);
            this.#anio = newAnio;
        } catch (error) {
            throw new ValidationError(`Error al modificar año: ${error.message}`, error);
        }
    }

    setDirector(newDirector) {
        try {
            ValidacionPelicula.nombreDirectorPelicula(newDirector);
            this.#director = newDirector;
        } catch (error) {
            throw new ValidationError(`Error al modificar nombre director: ${error.message}`, error);
        }
    }

    setDuracion(newDuracion) {
        try {
            ValidacionPelicula.duracion(newDuracion);
            this.#duracion = newDuracion;
        } catch (error) {
            throw new ValidationError(`Error al modificar duración: ${error.message}`, error);
        }
    }

    deactivate() {
        console.log(this.#active);
        this.#active = false;
    }

    activate() {
        this.#active = true;
    }

    getAllProperties() {
        return {
            id: this.#id,
            nombre: this.#nombre,
            anio: this.#anio,
            director: this.#director,
            duracion: this.#duracion,
            active: this.#active
        };
    }

    static instancearPelicula(objeto) { //se debe hacer si se usa programacion funcional?
        try {
            const { id, nombre, anio, director, duracion } = objeto;
            const nuevaInstancia = new Pelicula(nombre, anio, director, duracion);
            nuevaInstancia.setId(id);

            return nuevaInstancia;
        } catch (error) {
            throw new InternalServerError('Problemas al formatear la instancia de Película', error);
        }
    }

    static async crear(data) {
        try {
            const { nombre, anio, director, duracion } = data;
            const pelicula = new Pelicula(nombre, anio, director, duracion);
            const peliculaObject = pelicula.getAllProperties();

            await createDataFile(peliculaObject, 'peliculas.json');

            return peliculaObject;
        } catch (error) {
            throw new InternalServerError('Falló al crear una nueva película', error);
        }
    }

    static async encontrarPeliculas() {
        try {
            const pelicula = await getAllData('peliculas.json');
            return pelicula;
        } catch (error) {
            throw new InternalServerError('Error al obtener los datos de las películas', error);
        }
    }

    static async actualizarPelicula(id, data) {
        try {
            const actualizarMovie = await updatePelicula(id, data, 'peliculas.json');
            return actualizarMovie;
        } catch (error) {
            throw new InternalServerError('Error al actualizar las películas', error);
        }
    }

    static async borrarPelicula(id) {
        try {
            await softDeletePelicula(id, 'peliculas.json', Pelicula);
        } catch (error) {
            throw new InternalServerError('Falló eliminar la película', error);
        }
    }

    static async obtenerPeliculasActivas() {
        try {
            const peliculasActivas = await getAllActivePelicula('peliculas.json');
            return peliculasActivas
        } catch (error) {
            throw new InternalServerError("Error al obtener los datos de la película", error);
        }
    }

    static async encontrarPeliculaPorId(id) {
        try {
            const pelicula = await getPeliculaById(id, 'peliculas.json')
            return pelicula
        } catch (error) {
            throw new InternalServerError("Error al obtener los datos de la película", error);
        }
    }


    static async encontrarPeliculaPorNombre(nombre) {
        try {
            const pelicula = await getPeliculaByNombre(nombre, 'peliculas.json')
            return pelicula
        } catch (error) {
            throw new InternalServerError("Error al obtener los datos de la pelicula", error);
        }
    }



    static async encontrarPeliculaDirector(nombre) {
        try {
            const pelicula = await getPeliculaByDirector(nombre, 'peliculas.json')
            return pelicula
        } catch (error) {
            throw new InternalServerError("Error al obtener los datos de la película", error);
        }
    }

}

























