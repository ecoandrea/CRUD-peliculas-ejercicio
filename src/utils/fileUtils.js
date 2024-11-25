import { JsonError, NotFoundError } from "../errors/typesError.js"
import { createFile, readFile } from "../services/fileService.js"

export const createDataFile = async (data, dataPath) => {
    try {
        const datafile = await readFile(dataPath)
        let dataJson = null

        !datafile || datafile.length === 0 ? (dataJson = [data]) : dataJson = [...datafile, data]

        await createFile(dataJson, dataPath)
    } catch (error) {
        throw new JsonError('Error al gestionar la creación del archivo con la data', error)
    }
}

export const getAllData = async (pathData) => {
    try {
        const data = await readFile(pathData)
        return data
    } catch (error) {
        throw new NotFoundError('No pudimos acceder a los datos', error)
    }
}

export const updatePelicula = async (id, newData, pathData) => {
    try {
        const data = await readFile(pathData)
        const indexData = data.findIndex(dataFound => dataFound.id === id);

        if (indexData === -1) console.error('No pudimos encontrar el dato que buscas')

        const oldData = { ...data[indexData] }
        data[indexData] = { ...data[indexData], ...newData }

        data[indexData] = { id, ...newData, active: true }; //preguntar porque va  active
        await createFile(data, pathData)

        return oldData
    } catch (error) {
        throw new JsonError('No pudimos actualizar la película', error)
    }
}

export const softDeletePelicula = async (id, pathData, Model) => {
    try {
        // Leer los datos del archivo
        const data = await readFile(pathData);

        // Buscar el índice de la película
        const indexData = data.findIndex(dataFound => dataFound.id === id);
        if (indexData === -1) {
            throw new NotFoundError(`Pelicula con ID ${id} no encontrada`);
        }

        // *Instanciar la película utilizando el modelo
        const peliculaData = data[indexData];
        const peliculaInstance = Model.instancearPelicula(peliculaData); // por que hay dos const? preguntar

        // Marcar la película como inactiva
        peliculaInstance.deactivate();  // Aquí usamos deactivate que cambia el estado de 'active'

        // Actualizar los datos en el archivo
        data[indexData] = peliculaInstance.getAllProperties();

        // Guardar los cambios en el archivo
        await createFile(data, pathData);

        return peliculaInstance;  // *Retornar la película desactivada 

    } catch (error) {
        // Manejo de errores
        console.error(error);
        throw new JsonError("No pudimos actualizar la data de la película", error);
    }
}

export const getAllActivePelicula = async (pathData) => {
    try {
        const data = await readFile(pathData);

        const activeData = data.filter(dataFound => dataFound.active);

        const dataToRender = activeData.map(({ active, ...resto }) => resto)

        return dataToRender

    } catch (error) {
        throw new NotFoundError("No pudimos encontrar la data", error);
    }
}

export const getPeliculaById = async (id, pathData) => {
    try {
        const data = await readFile(pathData)
        const dataFound = data.find(dataFound => dataFound.id === id)

        return dataFound
    } catch (error) {
        throw new NotFoundError('No pudimos encontrar el dato por el id', error)
    }
}

export const getPeliculaByNombre = async (nombre, pathData) => {
    try {
        const data = await readFile(pathData);

        const nameNormalized = nombre.toLocaleLowerCase().replace(/\s+/g, '')

        const pelicula = data.filter(
            (pelicula) =>
                pelicula.nombre.toLocaleLowerCase().replace(/\s+/g, '') === nameNormalized
        );
        return pelicula
    } catch (error) {
        throw new NotFoundError('No pudimos encontrar el dato por el nombre', error)
    }

}


export const getPeliculaByDirector = async (director, pathData) => {
    try {
        const data = await readFile(pathData);

        const directorNormalized = director.toLocaleLowerCase().replace(/\s+/g, '')

        const pelicula = data.filter(
            (pelicula) =>
                pelicula.director.toLocaleLowerCase().replace(/\s+/g, '') === directorNormalized
        );
        return pelicula
    } catch (error) {
        throw new NotFoundError('No pudimos encontrar el dato por el director', error)
    }
}
