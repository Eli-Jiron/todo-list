import { getData } from "./fetch.js";

let mensaje = document.getElementById("mensajeLogin");
let loginUser = document.getElementById("loginUser");
let loginPassword = document.getElementById("loginPassword");

document.getElementById("btnLogin").addEventListener("click", async () => {
  let userReg = false;
  if (loginUser.value.trim() !== "" && loginPassword.value.trim() !== "") {
    if (!loginUser.checkValidity()) {
      mensaje.textContent = "Nombre de usuario no valido ( A-Z, números, . o _ )";
    } else {
      const promise = await getData();
      promise.forEach((e) => {
        if (e.user === loginUser.value && e.password === loginPassword.value) {
          userReg = true;
          sessionStorage.setItem("id", e.id);
        }
      });
      if (userReg) {
        mensaje.textContent = "Redireccionando...";
        location.href = "index.hmtl";
      } else {
        mensaje.textContent = "El usuario o contraseña no coinciden";
      }
    }
  } else {
    mensaje.textContent = "Debe llenar todos los espacios";
  }
});
