import { v4 as uuidv4 } from 'uuid';
import { createDataFile, getAllData, softDeletePelicula, updatePelicula } from '../utils/fileUtils.js';
import { ValidacionPelicula } from '../utils/Validaciones.js';


export class Pelicula {
    #id
    #nombre
    #anio
    #director
    #duracion
    #active
    constructor(nombre, anio, director, duracion) {
        this.#id = uuidv4().slice(0, 8); // para que quede id de 4 caracteres
        this.#nombre = ValidacionPelicula.nombre(nombre, );
        this.#anio = ValidacionPelicula.anio(anio); 
        this.#director = ValidacionPelicula.director(director, 'director'); 
        this.#duracion = ValidacionPelicula.duracion(duracion, 'duracion')
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
        try {

         ValidacionPelicula.nombre(nombre)
         this.#nombre = newNombre;
    
        } catch (error) {
            throw new Error(error)
        }
        
    }
    setAnio(newAnio) {
        try {
            ValidacionPelicula.anio(anio) //
            this.#anio = newAnio;
        } catch (error) {
            throw new Error(error)
        }
        
    }
    
    setDirector(newDirector) {
        try {
            ValidacionPelicula.director(director)
            this.#director = newDirector;
        } catch (error) {
            throw new Error(error)
        }
        
    }
    
    setDuracion(newDuracion) {
        try {
            ValidacionPelicula.duracion(duracion)
            this.#duracion = newDuracion;
        } catch (error) {
            throw new Error(error)
        }
        
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