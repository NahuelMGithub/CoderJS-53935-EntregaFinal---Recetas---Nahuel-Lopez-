//----------------------------------------------------- Obtener DATA
let todosLosIngredientes = []
let todasLasRecetas = []
let ingredientesQueTiene = []

importarIngredientesYRecetas()
//let recetasDelUsuario = []
document.addEventListener("DOMContentLoaded", ()=>{
    if( JSON.parse(localStorage.getItem('recetasDeUsuario'))) {
        recetasDelUsuario = JSON.parse(localStorage.getItem('recetasDeUsuario'))
    } else{
        recetasDelUsuario = []
    }

    recetasDelUsuario.forEach(receta => todasLasRecetas.push(receta))
})




//------------------------- dibujar la receta



function dibujarMenu(recetas) {
  let idCard = 100
  const contenedorRecetas = document.querySelector('#menuRecetas');
  let html = "";
  recetas.forEach(({ name, tiempo, rutaImagen, ingredientes, lugar, pasos }) => {
    idCard+=1
    html += ` 
  <div class="card" style="width: 18rem;">
        <div class="card-body" id=${idCard}>
              <h5 class="card-title">${name}</h5>
              <p class="card-text">Ingredientes: ${detallesIngredientes(ingredientes)}</p>
               <p class="card-text">Modo de cocinar: ${lugar}</p>
              <p class="card-text">Pasos: ${pasos}</p>
              <p class="card-text">Tiempo estimado: ${tiempo}</p>
               <img src= "${rutaImagen}"/>
              <button class="btn btn-primary agregarAFavoritos" onclick="detallesDeReceta(${idCard})" >Ver detalles.</button>
            </div>
          </div>
  `
    contenedorRecetas.innerHTML = html
  })
}

function detallesIngredientes(listadoIngredientes) {
  let nombresIng = []
  listadoIngredientes.forEach(ing => {
    nombresIng.push(ing.nombre)
  })
  return nombresIng

}

//-------------------------Creador de Receta----------------------------------------------------------------------------------------------
class Receta {
  constructor(name, tiempo, rutaImagen, ingredientes, lugar, pasos) {
    this.name = name; // String, indica el nombre de la comida
    this.pasos = pasos; // es un string contando los pasos
    this.ingredientes = ingredientes; // es una lista de ingredientes
    this.lugar = lugar; // es unlistado delas formas posibles para cocinarlo. 
    this.tiempo = tiempo; // tiempo que se tarda en cocinar
    this.rutaImagen = rutaImagen; // tiempo que se tarda en cocinar
  }
  listaNombresIngredientes() {
    let ingredientesTotales = this.ingredientes.map(ingrediente => ingrediente.nombre);
    return ingredientesTotales;
  }
  esVegetariano() {
    let esVegetariano = true;
    this.ingredientes.forEach(ingrediente => {
     if (ingrediente.tipo === "carne" || ingrediente.tipo === "marisco-pescado" ) {esVegetariano = false}
    })
    return esVegetariano;
  }
  esVegano() {
    let esVegano = true;
    this.ingredientes.forEach(ingrediente => {
      if (ingrediente.tipo === "carne" || ingrediente.tipo === "marisco-pescado" || ingrediente.nombre == 'huevo' || ingrediente.tipo === "lacteo") {
        esVegano = false
      }
    })
    return esVegano;
  }
  esAptoCeliaco() {
    let esAptoCeliaco = true;
    this.ingredientes.forEach(ingrediente => {
      ingrediente.tipo === "cereal-harina" && (esAptoCeliaco = false)

    })
    return esAptoCeliaco;
  }
}

//------------------------  filtros------------------------------------------------------------------------------------------------------


const lugarDeCocinar = document.querySelector('#seleccion-formaCocina')
const dietaCocina = document.querySelector('#seleccion-dieta')
const btnParaMostrarRecetas = document.querySelector('#btnMostrarRecetas')
btnParaMostrarRecetas.addEventListener('click', buscarRecetas)

function buscarRecetas() {

  let recetasFltradas = todasLasRecetas 


  if(lugarDeCocinar.value != "Indistinto"){
    recetasFltradas = recetasFltradas.filter(receta => receta.lugar == lugarDeCocinar.value)
  }

  if (dietaCocina.value != "Indistinto") {
    dietaCocina.value == 'Vegetariano' && (recetasFltradas = recetasFltradas.filter(receta => receta.esVegetariano()))
    dietaCocina.value == 'Vegano' && (recetasFltradas = recetasFltradas.filter(receta => receta.esVegano()))
    dietaCocina.value == 'Celiaco' && (recetasFltradas = recetasFltradas.filter(receta => receta.esAptoCeliaco()))
}

if (ingredientesQueTiene.length) {
  recetasFltradas = recetasFltradas.filter(receta => receta.listaNombresIngredientes().every(ingrediente => ingredientesQueTiene.includes(ingrediente)))
}

buscarYMostrar(recetasFltradas) 

}

function buscarYMostrar(recetasFltradas) {

  let timerInterval;
  Swal.fire({
    title: "Buscando",
    html: "Buscando Recetas.<b>",
    timer: 1500,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();   
    },
    willClose: () => {
      clearInterval(timerInterval);
      recetasFltradas.length?  dibujarMenu(recetasFltradas) : alertaMensaje("No hay recetas con esos criterios.")
    }
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer");
    }
  });
}
  
//---------------------------------------  Modal --------------------------------------------------------------------------------------------------------------

const btnModalIngredientes = document.querySelector('#selectorIngredientes')
btnModalIngredientes.addEventListener('click', openModal)

let ingredientesSeleccionados = []

function openModal() {
  ingredientesSeleccionados = []
  const modal = document.getElementById('modalIngredientes');
  modal.style.display = 'block';
}

function closeModal() {
  const modal = document.getElementById('modalIngredientes');
  modal.style.display = 'none';
}

function mostrarIngredientes(tipo, lugar) {

  const ingredientesContainer = document.getElementById(lugar);
  ingredientesContainer.innerHTML = '';
  let ingredientes = []
  ingredientes = todosLosIngredientes
    .filter(ingrediente => ingrediente.tipo === tipo)
    .map(ingrediente => ingrediente.nombre);

  ingredientes.forEach(ingrediente => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = ingrediente;
    const label = document.createElement('label');
    label.textContent = ingrediente;
    label.setAttribute('for', ingrediente);
    ingredientesContainer.appendChild(checkbox);
    ingredientesContainer.appendChild(label);
   });

}



const btnGuardarModal = document.querySelector('#btnGuardarModal')
btnGuardarModal.addEventListener('click', guardarModal)

function guardarModal() {

  ingredientesQueTiene = []
  checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  checkboxes.forEach(function (checkbox) {
      ingredientesQueTiene.push(checkbox.id)
  });
  closeModal()
}
//-------------------------------------------------------------------------------------------------











