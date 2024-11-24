import { ValidationError } from "../errors/typesError.js";

export class ValidacionPelicula {

    /**
     * Valida el nombre de la película
     * @param {string} nombrePelicula - Nombre de la película
     * @returns {string} - El nombre de la película si es válido
     * @throws {ValidationError} - Si el nombre no es válido
     */
    static nombrePelicula(nombrePelicula) {

        // Verifica que nombrePelicula sea una cadena de texto
        if (typeof nombrePelicula !== 'string') {
            throw new ValidationError('El nombre de la película debe ser una cadena de texto.');
        }

        // Verifica que el nombre tenga al menos 2 caracteres
        if (nombrePelicula.length < 2) {
            throw new ValidationError('Nombre de la película es obligatorio y debe tener al menos 2 caracteres.');
        }

        // Verifica que el nombre contenga solo letras y espacios
        const nombreRegex = /^[a-zA-ZáéíóúÁÉÓÍÚñÑüÜ0-9\s]+$/;

        if (!nombreRegex.test(nombrePelicula)) {
            throw new ValidationError('El nombre de la película debe contener solo letras y espacios.');
        }

        return nombrePelicula;
    }

    /**
     * Valida el año de la película
     * @param {number} anioPelicula - Año de la película
     * @returns {number} - El año de la película si es válido
     * @throws {ValidationError} - Si el año no es válido
     */
    static anioPelicula(anioPelicula) {
        // Verifica que el año sea un número
        if (typeof anioPelicula !== 'number') {
            throw new ValidationError('El año debe ser un número.');
        }

        // Verifica que el año esté en un rango válido
        if (anioPelicula < 1895 || anioPelicula > new Date().getFullYear()) {
            throw new ValidationError('El año debe ser un número válido entre 1895 y el año actual.');
        }

        return anioPelicula;
    }

    /**
     * Valida el nombre del director de la película
     * @param {string} nombreDirectorPelicula - Nombre del director
     * @returns {string} - El nombre del director si es válido
     * @throws {ValidationError} - Si el director no es válido
     */
    static nombreDirectorPelicula(nombreDirectorPelicula) {
        // Elimina espacios en blanco antes y después del nombre del director
        nombreDirectorPelicula = nombreDirectorPelicula.trim();

        // Verifica que el director sea una cadena de texto
        if (typeof nombreDirectorPelicula !== 'string') {
            throw new ValidationError('El nombre del director debe ser una cadena de texto.');
        }

        // Verifica que el nombre del director tenga al menos 2 caracteres
        if (nombreDirectorPelicula.length < 2) {
            throw new ValidationError('El nombre del director de la película es obligatorio y debe tener al menos 2 caracteres.');
        }

        // Verifica que el nombre contenga solo letras y espacios
        const directorRegex = /^[a-zA-ZáéíóúÁÉÓÍÚñÑüÜ\s]+$/;
        if (!directorRegex.test(nombreDirectorPelicula)) {
            throw new ValidationError('El nombre del director debe contener solo letras y espacios.');
        }

        return nombreDirectorPelicula;
    }

    /**
     * Valida la duración de la película
     * @param {number} duracionPelicula - Duración de la película en minutos
     * @returns {number} - La duración de la película si es válida
     * @throws {ValidationError} - Si la duración no es válida
     */
    static duracionPelicula(duracionPelicula) {
        // Verifica que la duración sea un número mayor que 0
        if (typeof duracionPelicula !== 'number') {
            throw new ValidationError('La duración debe ser un número.');
        }

        if (duracionPelicula <= 0) {
            throw new ValidationError('La duración debe ser mayor que 0.');
        }

        return duracionPelicula;
    }


}

