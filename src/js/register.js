import { getData, postData } from "./fetch.js";

let mensaje = document.getElementById("mensaje");
let inputUser = document.getElementById("inputUser");
let inputPassword = document.getElementById("inputPassword");

document.getElementById("btnRegister").addEventListener("click", async () => {
  let userReg = false;
  if (inputUser.value.trim() !== "" && inputPassword.value.trim() !== "") { //Validación de los campos para evitar contenido vacío
    if (!inputUser.checkValidity()) { //Validación para que ingrese un username con caracteres validos (letras, números, '.' y '_')
      mensaje.textContent = "Solo caracteres validos ( A-Z, números, '.' o '_')";
    } else {
      const promise = await getData();
      promise.forEach((e) => { //Hace una busqueda en los usuarios registrados
        if (e.user === inputUser.value) {
          userReg = true; //En caso de que el usuario exista, vuelve a userReg en true
        }
      });
      if (userReg) { //Si el usuario existe, muestra este mensaje
        mensaje.textContent = "Nombre de usuario no disponible";
      } else { //En caso de lo contrario, sigue con el registro
        let dataReg = {
          user: inputUser.value,
          password: inputPassword.value,
          tasks: []
        };
        await postData(dataReg);
        mensaje.textContent = "";
      }
    }
  } else {
    mensaje.textContent = "Debe llenar todos los espacios";
  }
});
