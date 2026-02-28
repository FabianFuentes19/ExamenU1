const btnBuscar = document.getElementById("btnBuscar");
const contenido = document.getElementById("contenido");

const getNews = async (event) => {
  event.preventDefault();
  const inputBusqueda = document.getElementById("inputBusqueda").value;
  const fechaInicio = document.getElementById("fechaInicio").value;
  const fechaFin = document.getElementById("fechaFin").value;
  console.log(inputBusqueda, fechaInicio, fechaFin);

  const respuesta = await fetch(
    `https://newsapi.org/v2/everything?q=${inputBusqueda}&from=${fechaInicio}&to=${fechaFin}&sortBy=sortBy=popularity&apiKey=813f974985f340528922d1d692831ec2`,
  );
  try {
  const data = await respuesta.json();
  console.log(data);

  contenido.innerHTML = "";

  if (data.articles.length === 0) {
      contenido.innerHTML = `
        <div class="col-12 text-center mt-5">
          <div class="alert alert-warning">No se encontraron noticias para tu búsqueda.</div>
        </div>`;
      return;
    }

  data.articles.forEach((element) => {
    const card = document.createElement('div');
    card.className = "col-md-6 mb-4";
    card.innerHTML = ` 
                        <div class="card h-100"> 
                        <img src="${element.urlToImage }" class="card-img-top" alt="${element.title}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">titulo: ${element.title}</h5>
                            <p class="card-text text-muted">descripcion: ${element.description || "Sin descripción disponible"}</p>
                            <p class="card-text">by: ${element.source.name}</p>
                            <p class="card-text">Fecha: ${element.publishedAt}</p>
                            <a href="${element.url}" target="_blank" class="btn btn-primary mt-auto">Leer noticia</a>
                        </div>
                    </div>`;
    contenido.appendChild(card);
  });
    } catch (error) {
        contenido.innerHTML = `<div class="alert alert-danger">Ingresa valores de busqueda.</div>`;
    }
};

btnBuscar.addEventListener("click", getNews);
