const fetchUrl = async() =>{
    const response = await fetch('http://localhost:3000/api/v1/peliculas',{method:"GET"});
    const data =  await response.json();
    return (data);
}

const mostrar = async () =>{
    const display = document.getElementById('display');
    let datos = await fetchUrl();
    let data=datos.data;
        data.forEach(item => {
            display.innerHTML+=`<div class="col-6 col-md-3 m-1">
                    <div class="card">
                    <div class="card-header">${item.nombre}</div>
                    <div class="card-body">
                        <h4 class="card-title">Año: ${item.anio}</h4>
                        <p class="card-text">Director: ${item.director}</p>
                    </div>
                    <div class="card-footer text-muted">Duración: ${item.duracion}</div>
                </div></div>`
        
    });
}

mostrar()