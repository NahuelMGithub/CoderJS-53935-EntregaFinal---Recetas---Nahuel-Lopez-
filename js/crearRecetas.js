const btnCrearMiReceta = document.querySelector('#btnCrearMiReceta')
//const tiempoCocinaUsuario = document.getElementById('tiempoDePreparación')
const nombreReceta = $i('nombreReceta')
const tiempoCocinaUsuario = $i('tiempoDePreparación')
const pasosReceta = $i('pasosReceta')
btnCrearMiReceta.addEventListener('click', validarYGuardarRecetanEnLS)





function validarYGuardarRecetanEnLS() {
    if (ingredientesQueTiene.length == 0) {
        validarCampo("Debe seleccionar al menos un ingrediente")

    } else if (lugarDeCocinar.value == "Indistinto") {
        validarCampo("Debe seleccionar donde cocinarlo")

    } else if (nombreReceta.value.length < 5) {
        validarCampo("La receta debe tener un nombre")

    } 
    else if (!tiempoCocinaUsuario.value.length) {
        validarCampo("La receta debe tener un tiempo de preparacion")

    } else if (pasosReceta.value.length < 20) {
        validarCampo("La receta debe tener al menos 20 caracteres")

    }
    else {
        guardarRecetanEnLS()
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Tu receta fue guardada",
            showConfirmButton: false,
            timer: 1500
          })
          //reinciarCreador()
       
    } 

  
}

function validarCampo(msj){
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: msj
   });}



/* function guardarRecetanEnLS(){
    let recetaUsuario = new Receta (nombreReceta.value, tiempoCocinaUsuario.value, "img/Tarta de Manzana.jpg",
      ingredientesQueTiene, lugarDeCocinar.value, pasosReceta.value )
         recetasDelUsuario.push(recetaUsuario)
         localStorage.setItem("recetasDeUsuario", JSON.stringify(recetasDelUsuario))
alert(recetasDelUsuario)
}
 */