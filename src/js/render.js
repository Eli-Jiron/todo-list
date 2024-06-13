import { putData } from "./fetch.js";
import { loadUser } from "./index.js";

let sessionId = sessionStorage.getItem("id");
let taskList = document.getElementById("taskList");

export const renderTasks = (userTasks) => {
  userTasks.forEach((e) => {
    //Etiquetas//
    let taskBorder = document.createElement("div");
    let divContent = document.createElement("div");
    let divTask = document.createElement("div");
    let divBtn = document.createElement("div");
    let checkbox = document.createElement("input");
    let btnDelete = document.createElement("button");
    let btnEdit = document.createElement("button");
    let btnDeleteImg = document.createElement("img");
    let btnEditImg = document.createElement("img");

    //Contenido//
    btnDeleteImg.src = "https://autumn.revolt.chat/attachments/wFIHXe0d91Rb_yLIbiSq9ZK9NyB-QpKEuTHIC1RxLB";
    btnEditImg.src = "https://autumn.revolt.chat/attachments/PsiPkuNbVmVeeaSwfPqXvap1luWr87prb5XP3GaYIb";
    checkbox.type = "checkbox";

    //Clases y Ids//
    if (e.complete) {
      checkbox.className = "checked";
    } else {
      checkbox.className = "unchecked";
    }
    taskBorder.className = "taskBorder";
    divContent.className = "divContent";
    divContent.id = e.id;
    btnDelete.className = "btnDelete";
    btnEdit.className = "btnEdit";
    btnDeleteImg.className = "btnImg";
    btnEditImg.className = "btnImg";
    divBtn.className = "divBtn";

    //Armado//
    btnDelete.appendChild(btnDeleteImg);
    btnEdit.appendChild(btnEditImg);
    divBtn.appendChild(btnEdit);
    divBtn.appendChild(btnDelete);
    divTask.textContent = e.task;
    divContent.appendChild(checkbox);
    divContent.appendChild(divTask);
    divContent.appendChild(divBtn);
    taskBorder.appendChild(divContent);
    taskList.appendChild(taskBorder);

    //Funciones//
    checkbox.addEventListener("click", async () => {
      if (e.id === divContent.id) {
        if (e.complete) {
          e.complete = false;
          checkbox.className = "unchecked";
        } else {
          e.complete = true;
          checkbox.className = "checked";
        }
      }
      await putData(sessionId, { tasks: userTasks });
    });

    btnEdit.addEventListener("click", async () => {
      renderModal(e.task, userTasks);
    });

    btnDelete.addEventListener("click", async () => {
      if (e.id === divContent.id) {
        let index = userTasks.indexOf(e);
        userTasks.splice(index, 1);
        await putData(sessionId, { tasks: userTasks });
      }
    });
  });
};

const renderModal = (task, userTasks) => { //Función que renderiza un modal para editar tareas
  //Etiquetas//
  let modal = document.createElement("div");
  let divBorder = document.createElement("div");
  let modalContent = document.createElement("div");
  let btnClose = document.createElement("button");
  let txtPreview = document.createElement("div");
  let inputEdit = document.createElement("input");
  let btnEdit = document.createElement("button");
  let divInput = document.createElement("div");

  //Contenido//
  btnEdit.textContent = "Editar";
  btnClose.textContent = "X";
  inputEdit.placeholder = "Ingrese nueva tarea";
  txtPreview.textContent = `Editar: "${task}"`;

  //Clases//
  btnEdit.className = "btnModalEdit";
  inputEdit.className = "inputEdit";
  btnClose.className = "btnClose";
  modal.className = "modal";
  modalContent.className = "modalContent";
  divBorder.className = "divBorder";
  divInput.className = "divInput";

  //Armado//
  divInput.appendChild(inputEdit);
  divInput.appendChild(btnEdit);
  modalContent.appendChild(txtPreview);
  modalContent.appendChild(divInput);
  divBorder.appendChild(btnClose);
  divBorder.appendChild(modalContent);
  modal.appendChild(divBorder);
  document.body.appendChild(modal);

  inputEdit.addEventListener("keydown", async (event) => { //Función para editar la tarea al teclear "ENTER"
    if (event.key === "Enter") {
      if (inputEdit.value.trim() !== "") { //Valida que el espacio no esté vacío
        userTasks.forEach((e) => {
          if (task === e.task) {
            e.task = inputEdit.value;
          }
        });
        await putData(sessionId, { tasks: userTasks });
        document.body.removeChild(modal);
      }
    }
  });

  btnEdit.addEventListener("click", async () => { //Función para editar la tarea al clicklear en el botón "Editar"
    if (inputEdit.value.trim() !== "") { //Valida que el espacio no esté vacío
      userTasks.forEach((e) => {
        if (task === e.task) {
          e.task = inputEdit.value;
        }
      });
      await putData(sessionId, { tasks: userTasks });
      document.body.removeChild(modal);
    }
  });

  btnClose.addEventListener("click", function () { //Cierra el modal
    document.body.removeChild(modal);
  });
};
