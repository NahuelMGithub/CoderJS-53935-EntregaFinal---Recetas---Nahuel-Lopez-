
function alertaMensaje(txt){
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: txt,
    });
}

function modalSwit(){
    Swal.fire({
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





//------------------------------ funciones con ASINCRONICAS

function traerIngredientes(){
  fetch('../data/data-ingredientes.json')
  .then(respuesta => {
    return respuesta.json()
  })
  .then(datos => {
    console.log(datos) 
  })
  .catch(() => {
    alertaMensaje("No se pudieron cargar correctamente los ingredientes.")
  })
}