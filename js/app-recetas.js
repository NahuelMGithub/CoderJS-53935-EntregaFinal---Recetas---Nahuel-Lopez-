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

      return todasLasRecetas
     })
    .catch(() => {
      alertaMensaje("No se pudieron cargar correctamente las recetas.")
    })
  })
  

    


function crearRecetas(items){
items.forEach(({name, tiempo, img, ingredientes, lugar, pasos})=>{
  let nuevaReceta = new Receta(name, tiempo, img, ingredientes, lugar, pasos)
  todasLasRecetas.push(nuevaReceta)
  
  
})
} 

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








//---------------------------------------  Modal


const btnModalIngredientes = document.querySelector('#selectorIngredientes')
btnModalIngredientes.addEventListener('click', openModal)

let ingredientesImportados = []
let ingredientesSeleccionados = []
function openModal() {
   const modal = document.getElementById('modalIngredientes');
  fetch('../data/data-ingredientes.json')
  .then(respuesta => {
    return respuesta.json()
  })
  .then(datos => {
    datos.forEach(dato => ingredientesImportados.push(dato))
  })
  .catch(() => {
    alertaMensaje("No se pudieron cargar correctamente los ingredientes.")
  })

  modal.style.display = 'block';
  
}

let misIngredientes =[
  {"nombre": "pollo", "tipo": "carne"},
  {"nombre": "res", "tipo": "carne"},
  {"nombre": "cerdo", "tipo": "carne"},
  {"nombre": "cordero", "tipo": "carne"},
  {"nombre": "pavo", "tipo": "carne"},
  {"nombre": "ternera", "tipo": "carne"},
  {"nombre": "carne picada", "tipo": "carne"},

  {"nombre": "salmón", "tipo": "marico-pescado"},
  {"nombre": "camarones", "tipo": "marico-pescado"},
  {"nombre": "merlusa", "tipo": "marico-pescado"},
    
  {"nombre": "manzana", "tipo": "fruta"},
  {"nombre": "plátano", "tipo": "fruta"},
  {"nombre": "naranja", "tipo": "fruta"},
  {"nombre": "uva", "tipo": "fruta"},
  {"nombre": "piña", "tipo": "fruta"},
  {"nombre": "limon", "tipo": "fruta"},

  {"nombre": "zanahoria", "tipo": "verdura"},
  {"nombre": "lechuga", "tipo": "verdura"},
  {"nombre": "tomate", "tipo": "verdura"},
  {"nombre": "cebolla", "tipo": "verdura"},
  {"nombre": "pepino", "tipo": "verdura"},
  {"nombre": "pimiento", "tipo": "verdura"},
  {"nombre": "espinaca", "tipo": "verdura"},
  {"nombre": "brócoli", "tipo": "verdura"},
  {"nombre": "calabacín", "tipo": "verdura"},
  {"nombre": "berenjena", "tipo": "verdura"},
  {"nombre": "papas", "tipo": "verdura"},
  {"nombre": "ajo", "tipo": "verdura"},
  {"nombre": "portobellos", "tipo": "verdura"},

  {"nombre": "garbanzo", "tipo": "legumbre"},
  {"nombre": "lenteja", "tipo": "legumbre"},
  {"nombre": "guisante", "tipo": "legumbre"},
      
  {"nombre": "leche", "tipo": "lacteo"},
  {"nombre": "yogur", "tipo": "lacteo"},
  {"nombre": "queso", "tipo": "lacteo"},
  {"nombre": "mozzarella", "tipo": "lacteo"},
  {"nombre": "queso rallado", "tipo": "lacteo"},
  {"nombre": "queso parmesano", "tipo": "lacteo"},
  {"nombre": "mantequilla", "tipo": "lacteo"},
  {"nombre": "crema", "tipo": "lacteo"},

  {"nombre": "fideos", "tipo": "cereal-harina"},
  {"nombre": "tortillas de maíz", "tipo": "cereal-harina"},
  {"nombre": "maíz", "tipo": "cereal-harina"},
  {"nombre": "arroz", "tipo": "cereal-harina"},
  {"nombre": "avena", "tipo": "cereal-harina"},
  {"nombre": "harina", "tipo": "cereal-harina"},

  {"nombre": "salsa de tomate", "tipo": "alacena"},
  {"nombre": "salsa de soja", "tipo": "alacena"},
  {"nombre": "huevo", "tipo": "alacena"},
  {"nombre": "aceite de oliva", "tipo": "alacena"},
  {"nombre": "vinagre", "tipo": "alacena"},
  {"nombre": "azúcar", "tipo": "alacena"},
  {"nombre": "calditos", "tipo": "alacena"},
  {"nombre": "sal", "tipo": "alacena"},
  {"nombre": "pimienta", "tipo": "alacena"},
  {"nombre": "salsa barbacoa", "tipo": "alacena"},
  {"nombre": "miel", "tipo": "alacena"},
  {"nombre": "mostaza", "tipo": "alacena"},

  {"nombre": "tomillo fresco", "tipo": "hierba"},
  {"nombre": "perejil fresco", "tipo": "hierba"},
  {"nombre": "orégano fresco", "tipo": "hierba"},
  {"nombre": "romero fresco", "tipo": "hierba"}
  
]




// Función para cerrar el modal
function closeModal() {
  const modal = document.getElementById('modalIngredientes');
  modal.style.display = 'none';
}

function mostrarIngredientes(tipo) {

  mostrarSeleccionados()
  // Limpiar el contenido previo en ingredientes-container
  const ingredientesContainer = document.querySelector('.ingredientes-container');
  ingredientesContainer.innerHTML = '';

  // Definir los ingredientes correspondientes a cada tipo
  let ingredientes = []
  ingredientes = misIngredientes
  .filter(ingrediente => ingrediente.tipo === tipo)
  .map(ingrediente => ingrediente.nombre);

  // Agregar los checkboxes correspondientes a ingredientes-container
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

  chequearLosYaSeleccionados()

}



function mostrarSeleccionados(){

    // Obtener todos los checkboxes dentro de ingredientes-container
    const checkboxes = document.querySelectorAll('.ingredientes-container input[type="checkbox"]');
    // Filtrar solo los checkboxes que están seleccionados
    const seleccionados = Array.from(checkboxes).filter(checkbox => checkbox.checked);
    // Obtener las etiquetas de los ingredientes seleccionados y mostrarlas
    const etiquetasSeleccionadas = seleccionados.map(checkbox => {
      const label = document.querySelector(`label[for="${checkbox.id}"]`);
      return label.textContent;
    });
    etiquetasSeleccionadas.forEach(ingrediente => {   
      if(!ingredientesSeleccionados.includes(ingrediente)){
        ingredientesSeleccionados.push(ingrediente) 
      }
    })

    console.log("Ingredientes seleccionados:", ingredientesSeleccionados);
}

function chequearLosYaSeleccionados(){

  const checkboxes = document.querySelectorAll('.ingredientes-container input[type="checkbox"]');
 
  checkboxes.forEach( box => {
  
    if(ingredientesSeleccionados.includes(box.id)){
      box.checked = true
    }})}
  
