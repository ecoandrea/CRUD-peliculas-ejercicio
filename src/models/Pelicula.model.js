import { v4 as uuidv4 } from 'uuid';
import { createDataFile, getAllData, softDeletePelicula, updatePelicula } from '../utils/fileUtils.js';


export class Pelicula {
    #id
    #nombre
    #anio
    #director
    #duracion
    #active
    constructor(nombre, anio, director, duracion) {
        this.#id = uuidv4().slice(0, 8); // para que quede id de 4 caracteres
        this.#nombre = nombre;
        this.#anio = anio;
        this.#director = director;
        this.#duracion = duracion;
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
    this.#id = newId

    }
    
    setNombre(newNombre) {
        this.#nombre = newNombre;
    }
    
    setAnio(newAnio) {
        this.#anio = newAnio;
    }
    
    setDirector(newDirector) {
        this.#director = newDirector;
    }
    
    setDuracion(newDuracion) {
        this.#duracion = newDuracion;
    }

    desactive() {
        console.log(this.#active)
        this.#active = false
      }
    
      active() {
        this.#active = true
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

    static instancearPelicula(objeto) {
        try {
            const { id, nombre, anio, director, duracion } = objeto;
            const nuevaInstancia = new Pelicula(nombre, anio, director, duracion);
            nuevaInstancia.setId(id)
    
            return nuevaInstancia
        } catch (error) {
            throw new Error('Problemas al formatear la instancia de Usuario', error)
        }
      }


   

    static async crear(data) {
        try {
          const { nombre, anio, director, duracion} = data
          const pelicula = new Pelicula(nombre, anio, director, duracion)
          const peliculaObject = pelicula.getAllProperties() //para que se vean los datos porq estan encapsulados
      
          await createDataFile(peliculaObject, 'peliculas.json')
      
          return peliculaObject
        } catch (error) {
          throw new Error(`Falló al crear una nueva pelicula`, error)
        }
      }
    
      static async encontrarPeliculas() {
        try {
          const pelicula = await getAllData('peliculas.json')
          return pelicula
        } catch (error) {
          throw new Error('Error al obtener los datos de las peliculas', error)
        }
      }

      static async actualizarPelicula (id, data) {
        try {
        const actualizarMovie = await updatePelicula(id, data, 'peliculas.json')
        return actualizarMovie
        } catch (error) {
            throw new Error('Error al actualizar las peliculas', error)
        }
      }

      static async borrarPelicula(id) {
        try {
          await softDeletePelicula(id, 'peliculas.json', Pelicula)
        } catch (error) {
          throw new Error(`Fallo al eliminar el usuario`, error);
        }
      }



}