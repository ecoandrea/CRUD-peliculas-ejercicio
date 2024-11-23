


  export class ValidacionPelicula {
/*
/**
     * Valida el nombre de la película
     * @param {string} nombrePelicula - Nombre de la película
     * @param {string} campoNombrePelicula - Nombre del campo para mostrar en el error
     * @returns {string} - El nombre de la película si es válido
     
     */
    
    static nombrePelicula(nombrePelicula) {


     const nombreRegex = /^[a-zA-ZáéíóúÁÉÓÍÚñÑüÜ\s]+$/;
     if (!nombreRegex.test(nombrePelicula))
        throw new Error(' debe contener solo letras`, `Error al validar el regex ');
     if (!nombrePelicula || nombrePelicula.length < 2) return { error: 'Nombre de la película es obligatorio y debe tener al menos 2 caracteres.' };

     if (typeof nombrePelicula !== 'string') {
        throw new Error(' debe ser una cadena de texto.');
    }

      return nombrePelicula;
        
    }

/*
     /**
     * Valida el año de la película
     * @param {number} anioPelicula - Año de la película
     * @param {string} campoAnioPelicula - Nombre del campo para mostrar en el error
     * @returns {number} - El año de la película si es válido
    
     */
    static anioPelicula(anioPelicula) {
      if (!anioPelicula || anioPelicula < 1895 || anioPelicula > new Date().getFullYear())
        throw new Error('debe ser un año válido, Error al validar el año ');

      if (typeof anioPelicula !== 'number') {
        throw new Error('debe ser un número.');
    }

      return anioPelicula;
    }

/*
        /**
     * Valida el director de la película
     * @param {string} directorPelicula - Nombre del director
     * @param {string} campoDirectorPelicula - Nombre del campo para mostrar en el error
     * @returns {string} - El nombre del director si es válido
    
     */
    static nombreDirectorPelicula(nombreDirectorPelicula, ) {
        const directorRegex = /^[a-zA-ZáéíóúÁÉÓÍÚñÑüÜ\s]+$/;
        if (!directorRegex.test(nombreDirectorPelicula))
           throw new Error('debe contener solo letras`, `Error al validar el regex ');
        if (!nombreDirectorPelicula || nombreDirectorPelicula.length < 2) return { error: 'Nombre del director de la película es obligatorio y debe tener al menos 2 caracteres.' };
   
        if (typeof nombreDirectorPelicula !== 'string') {
           throw new Error('debe ser una cadena de texto.');
       }
      return nombreDirectorPelicula;
    }

/*
/**
     * Valida la duración de la película
     * @param {number} duracionPelicula - Duración de la película en minutos
     * @param {string} campoDuracionPelicula - Nombre del campo para mostrar en el error
     * @returns {number} - La duración de la película si es válida
     
     */

   static duracionPelicula(duracionPelicula) {
      if (typeof duracionPelicula !== 'number' || duracionPelicula > 0) {
        throw new Error('debe ser un número y mayor a 0.');
    }

      return duracionPelicula;
    }

   }


  