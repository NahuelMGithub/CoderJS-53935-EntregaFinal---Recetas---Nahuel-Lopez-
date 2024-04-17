//----------------------------------------------------- Obtener DATA
let todosLosIngredientes = []
let todasLasRecetas = []


/* window.addEventListener('DOMContentLoaded', async  () => {
      try {
      const llamada = await fetch('../data/data-recetas.json')
      const respuesta = await llamada.json()
       await respuesta.forEach(dato=>todasLasRecetas.push(dato))
       console.log(todasLasRecetas[0]) //--------- PERFECTO
       } catch (error) {
      alertaMensaje("error de carga")
     }
 })

 
 console.log(todasLasRecetas[0]) //--------- UNDEFINED
 */


window.addEventListener('DOMContentLoaded',  () => {
  fetch('../data/data-recetas.json')
    .then(respuesta => {
      return respuesta.json()
    })
    .then(datos => {
         datos.forEach((dato)=>todasLasRecetas.push(dato))
      console.log(todasLasRecetas[0]) //--------- PERFECTO
      return todasLasRecetas
     })
    .catch(() => {
      alertaMensaje("No se pudieron cargar correctamente las recetas.")
    })
  })
  console.log(todasLasRecetas[0]) //--------- UNDEFINED


    /*
  fetch('../data/data-ingredientes.json')
    .then(respuesta => {
      return respuesta.json()
    })
    .then(datos => {
      crearIngredientes(datos)
    })
    .catch(() => {
      alertaMensaje("No se pudieron cargar correctamente los ingredientes.")
    })
})
function crearRecetas(items){
items.forEach(({name, tiempo, img, ingredientes, lugar, pasos})=>{
  let nuevaReceta = new Receta(name, tiempo, img, ingredientes, lugar, pasos)
  todasLasRecetas.push(nuevaReceta)
  console.log("desde 32 " + todasLasRecetas[0])
  
})
} */

function crearIngredientes(items) {
  items.forEach(item =>  todosLosIngredientes.push(item)  ) }

//------------------------- dibujar la receta

function dibujarMenu(recetas) {
  const contenedorRecetas = document.querySelector('#menuRecetas');
  let html = "";
  recetas.forEach(({ name, ingredientes, forma, pasos, tiempo, img }) => {
    html += ` 
  <div class="card" style="width: 18rem;">
           
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <p class="card-text">Ingredientes: ${ingredientes}</p>
              <p class="card-text">Modo de cocinar: ${forma}</p>
              <p class="card-text">Pasos: ${pasos}</p>
              <p class="card-text">Tiempo estimado: ${tiempo}</p>
              <a href="#" class="btn btn-primary agregarAFavoritos" >Agregar a Favoritos.</a>
            </div>
          </div>
  `
    contenedorRecetas.innerHTML = html
  })
}


//---------------------------------------------------------------------------------------------------------------------------------


class Receta {
  constructor(name, tiempo, img, ingredientes, lugar, pasos ) {
      this.name = name; // String, indica el nombre de la comida
      this.pasos = pasos; // es un string contando los pasos
      this.ingredientes = ingredientes; // es una lista de ingredientes
      this.lugar = lugar; // es unlistado delas formas posibles para cocinarlo. 
      this.tiempo = tiempo; // tiempo que se tarda en cocinar
      this.img = img; // tiempo que se tarda en cocinar
  }
  listaNombresIngredientes() {
          let ingredientesTotales = this.ingredientes.map(ingrediente => ingrediente.nombre); 
      return ingredientesTotales;
  } 
  esVegetariano() {
      let esVegetariano = true;
      this.ingredientes.forEach(ingrediente => {
          ingrediente.tipo === "carne" && (esVegetariano = false)
         })
      return esVegetariano;
  }
  esVegano() {
      let esVegano = true;
      
      this.ingredientes.forEach(ingrediente => {
          if (ingrediente.tipo === "carne" || ingrediente.nombre == 'huevo' || ingrediente.tipo === "lacteo") {
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

class Ingrediente{
    constructor (nombre, tipo) {
      this.nombre = nombre; 
      this.tipo = tipo;      
    }
 }

//---------------------------------------------------------------------------------------------------------------------------------

//--------- filtros
function recetasPorLugarDeCocina(lugarCocina){
  // ojo que si es indistitno, tiene q filtrar todas
  let recetasPorLugar = []
  todasLasRecetas.forEach((receta)=>{
    if(receta.lugar == lugarCocina){recetasPorLugar.push(receta)}
  })
return recetasPorLugar
}

// filtrado por dieta, usa metodos de las propias recetas