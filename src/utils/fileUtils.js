import { createFile, readFile } from "../services/fileService.js"

export const createDataFile = async(data, dataPath) => {
    try {
        const datafile = await readFile(dataPath)
        let dataJson = null

        !datafile || datafile.length === 0 ? (dataJson = [data]) : dataJson = [ ...datafile, data ]

        await createFile(dataJson, dataPath)
    } catch (error) {
        throw new Error(`Error al gestionar la creación del archivo con la data`, error)
    }
}

export const getAllData = async(pathData) => {
    try {
        const data = await readFile(pathData)
        return data
    } catch (error) {
        throw new Error('No pudimos acceder a los datos', error)
    }
}

export const updatePelicula = async(id, newData, pathData) => {
    try {
        const data = await readFile(pathData)
        const indexData = data.findIndex(dataFound => dataFound.id === id); 

        if(indexData === -1) console.error('No pudimos Encontrar el dato que buscas')
            
        const  oldData = {...data[indexData]}
        data[indexData] = {...data[indexData],...newData}

        data[indexData] = { id, ...newData, active: true };
        await createFile(data, pathData)

        return oldData
    } catch (error) {
        throw new Error('No pudimos actualizar la peicula', error)
    }
}


export const softDeletePelicula = async(id, pathData, Model) => {
    try {
        const data = await readFile(pathData);
        

        const indexData = data.findIndex(dataFound => dataFound.id === id)
        if (indexData === -1) throw new Error(`No pudimos encontrar la data`);

        const newInstance = Model.instancearPelicula(data[indexData]);
        console.log(newInstance)
        newInstance.desactive();
        
        data[indexData] = newInstance.getAllProperties()

        await createFile(data, pathData)        
    } catch (error) {
        throw new Error("No pudimos actualizar la data", error);
    }
}