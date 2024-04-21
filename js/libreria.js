
function alertaMensaje(txt){
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: txt,
    });
}

function modalSwit(){
    Swal.fire({
      width: 900,
        imageUrl: "https://placeholder.pics/svg/300x1500",
        imageHeight: 1500,
        imageAlt: "A tall image"
      });
}

function guardado(txt){
    Swal.fire({
        position: "center",
        icon: "success",
        title: txt,
        showConfirmButton: false,
        timer: 1500
      });
}

function simuladroBuscando(){
    let timerInterval;
Swal.fire({
  title: "Auto close alert!",

  timer: 1000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading();
    const timer = Swal.getPopup().querySelector("b");
    timerInterval = setInterval(() => {
      timer.textContent = `${Swal.getTimerLeft()}`;
    }, 100);
  },
  willClose: () => {
    clearInterval(timerInterval);
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log("I was closed by the timer");
  }
});
}


// function para document.querySelector('#')


function $i(id) {
  return document.getElementById(id);
}

function $c(classname) {
  return document.getElementsByClassName(classname);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}



//------------------------------ funciones con ASINCRONICAS

function importarIngredientesYRecetas(){ 
  fetch('../data/data-recetas.json')
    .then(respuesta => {
      return respuesta.json()
    })
    .then(datos => { crearRecetas(datos)
      return todasLasRecetas
    })
    .catch(() => {
      alertaMensaje("No se pudieron cargar correctamente las recetas.")
    })
  fetch('../data/data-ingredientes.json')
    .then(respuesta => {
      return respuesta.json()
    })
      .then(datos => {
      datos.forEach((dato) => todosLosIngredientes.push(dato))
      return todosLosIngredientes
    })
      .catch(() => {
      alertaMensaje("No se pudieron cargar correctamente los ingredientes.")
    })
}

function crearRecetas(items) {
  items.forEach(({ name, tiempo, img, ingredientes, lugar, pasos }) => {
    let nuevaReceta = new Receta(name, tiempo, img, ingredientes, lugar, pasos)
    todasLasRecetas.push(nuevaReceta)
  })
}


//-------------------- funciones de ayuda

function ayudaCrear(){
  Swal.fire({
    title: "Cómo crear una receta?",
    text: `Simplemente selecciona los ingredientes se requieren
    Escribe el nombre de la receta
    Coloca el lugar donde se cocinara
    El tiempo estimado de preparacion
    Escribe todos los pasos
    Finalmente hacer click en el boton "Crear mi receta`,
    icon: "question"
  });
}

function ayudaBuscar(){
  Swal.fire({
    title: "Cómo Buscar recetas?",
    text: `Podes usar uno o más criterios juntos
    Selector de ingredientes: Podes anotar Solo los ingredientes que tenes, de forma que únicamente obtengas recetas que puedas cocinar
    Además, podes filtrar recetas por tipo de dieta o lugar dónde quieras cocinar. Una vez que filtres, simplemente hacer click en Mostrar Recetas`,
    icon: "question"
  });
}
