
let contenedorFiltros = document.getElementById("contenedorFiltros");
let container = document.getElementById("container");
let arrTag = [];
let arrObj;

/*==========Con Fetch (Promesas similar a azyn await)===========*/
// fetch("../data.json")
//   .then(respuesta => respuesta.json())
//   .then(arrObjeto => {
//     agregarObj(arrObjeto)
//   })
// console.log("2");

//==========================con async await=====================
(async function pedirJson() {
  try{

    const responseJson = await fetch('Assets/json/data.json');
    arrObj = await responseJson.json();
    agregarObj(arrObj)

  }catch(error){
    console.log(error);
  }

})();


function agregarObj(arrObjeto) {
  arrObj = arrObjeto;
  aplicarFiltro()
}

/*========Con AJAX ============Nota: esta forma está descontinuada======

function leerJSON() {
  let request = new XMLHttpRequest();
  request.open('GET', "../data.json", false);
  request.send(null);
  if (request.status == 200)
    return JSON.parse(request.responseText);
}
arrObj = leerJSON()

//=======================================================================*/

function agregarTag(event) {
  if (arrTag.includes(event.target.innerHTML) == false) {
    arrTag.push(event.target.innerHTML)

    aplicarFiltro();
  }
}

function quitarTag(tag) {
  arrTag.splice(arrTag.indexOf(tag), 1)
  aplicarFiltro();
}

function aplicarFiltro() {

  contenedorFiltros.innerHTML = "";

  for (let tag of arrTag) {
    contenedorFiltros.innerHTML += `
      <div class="btn-group border rounded mx-1">
        <button class="btn btn-light">${tag}</button>
        <button class="btn btn-light" onclick="quitarTag('${tag}')">x</button>
      </div>
    `;
  }

  if (arrTag != 0) {

    container.innerHTML = "";

    for (let i = 0; i < arrObj.length; i++) {

      if (arrTag.includes(arrObj[i].role) || arrTag.includes(arrObj[i].level)) {
        agregarAlHTML(i);
        contenedorFiltros.classList.remove("d-none");
      } else {

        for (const languages of arrObj[i].languages) {

          if (arrTag.includes(languages)) {
            agregarAlHTML(i)
            contenedorFiltros.classList.remove("d-none")
            break
          }
        }
      }
    }
  } else {
    contenedorFiltros.classList.add("d-none")
    container.innerHTML = "";

    for (let i in arrObj) {
      agregarAlHTML(i);
    }
  }
}
aplicarFiltro();

function agregarAlHTML(i) {

  let arrayLanguages = arrObj[i].languages;

  container.innerHTML += `
      
    <div class="row shadow p-3 my-3 bg-white rounded box">

      <div class="col-md-1">
        <img src="${arrObj[i].logo}" alt="logo">
      </div>

      <div class="col py-2">
        <div class="pb-2">
          <span>${arrObj[i].company}</span>
          ${arrObj[i].new ? `<span class="rounded-pill bg-primary p-1 px-2 text-light mx-1"> <b> New </b>  </span>` : ``}
          ${arrObj[i].featured ? `<span class="rounded-pill bg-dark p-1 px-2 text-light mx-1">Featured</span>` : ``}
        </div>
        <p class="m-auto"> <strong> ${arrObj[i].position} </strong></p>
        <div class="text-muted">
          ${arrObj[i].postedAt} •
          ${arrObj[i].contract} •
          ${arrObj[i].location}
        </div>
      </div>

      <div class="col text-center align-items-center">
        <button class="btn btn-light" onclick="agregarTag(event)">${arrObj[i].role}</button>
        <button class="btn btn-light" onclick="agregarTag(event)">${arrObj[i].level}</button>
        ${arrayLanguages.map(lang => `<button class="btn btn-light" onclick="agregarTag(event)">${lang}</button>`)}
      </div>

    </div>
  `
}