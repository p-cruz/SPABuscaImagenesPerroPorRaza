let timer
let deleteFirstPhotoDelay

async function start() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all")
    const data = await response.json()
    creaListaRazas(data.message)
  } catch (e) {
    console.log("Hubo un problema cargando la lista de razas de perro.")
  }
}

start()

function creaListaRazas(listaRazas) {
  document.getElementById("raza").innerHTML = `
  <select onchange="cargaPorRaza(this.value)">
        <option>Elige una raza...</option>
        ${Object.keys(listaRazas).map(function (raza) {
          return `<option>${raza}</option>`
        }).join('')}
      </select>
  `
}

async function cargaPorRaza(raza) {
  if (raza != "Elige una raza...") {
    const response = await fetch(`https://dog.ceo/api/breed/${raza}/images`)
    const data = await response.json()
    createSlideshow(data.message)
  }
}

function createSlideshow(images) {
  console.log(images)
  document.getElementById("slideshow").innerHTML=""
  contador=1;
  if (images.length > 1) {
    cadena = `<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">`
    images.forEach(function(item,index){
      if (contador==1){
        cadena +=`<div class="carousel-item active">
                    <img src="${item}" class="d-block w-100" alt="imagen">
                </div>`
        contador++;
      }else{
          cadena +=`<div class="carousel-item">
                        <img src="${item}" class="d-block w-100" alt="imagen">
                    </div>`
      }
    });
    cadena+=`</div>
              <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </a>
              <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </a>
            </div>
            `
    document.getElementById("slideshow").insertAdjacentHTML("beforeend", cadena)
  }
}