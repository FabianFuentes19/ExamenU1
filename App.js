const btnBuscar = document.getElementById("btnBuscar");
const contenido = document.getElementById("contenido");

const getNews = async (event) => {
  event.preventDefault();
  const inputBusqueda = document.getElementById("inputBusqueda").value;
  const fechaInicio = document.getElementById("fechaInicio").value;
  const fechaFin = document.getElementById("fechaFin").value;
  console.log(inputBusqueda, fechaInicio, fechaFin);

  const respuesta = await fetch(
    `https://newsapi.org/v2/everything?q=${inputBusqueda}&from=${fechaInicio}&to=${fechaFin}&sortBy=publishedAt&apiKey=813f974985f340528922d1d692831ec2`,
  );
  const data = await respuesta.json();
  console.log(data);

  contenido.innerHTML = "";

  data.articles.forEach((element) => {
    const card = `
                    <div class="col-md-6 mb-4"> 
                        <img src="${element.urlToImage}" class="card-img-top" alt="${element.title}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text text-muted">${element.description || "Sin descripción disponible"}</p>
                            <a href="${element.url}" target="_blank" class="btn btn-primary mt-auto">Leer noticia</a>
                        </div>
                    </div>`;
    contenido.innerHTML += card;
  });
};

btnBuscar.addEventListener("click", getNews);
