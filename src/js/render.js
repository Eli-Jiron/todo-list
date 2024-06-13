import { putData } from "./fetch.js";

let sessionId = sessionStorage.getItem("id");
let taskList = document.getElementById("taskList");

export const renderTasks = (tasks) => {
  tasks.forEach((e) => {
    //Etiquetas//
    let borderTask = document.createElement("div");
    let divContent = document.createElement("div");
    let divTask = document.createElement("div");
    let divBtn = document.createElement("div");
    let checkbox = document.createElement("input");
    let btnDelete = document.createElement("button");
    let btnEdit = document.createElement("button");
    let btnDeleteImg = document.createElement("img");
    let btnEditImg = document.createElement("img");

    //Contenido//
    btnDeleteImg.src =
      "https://autumn.revolt.chat/attachments/wFIHXe0d91Rb_yLIbiSq9ZK9NyB-QpKEuTHIC1RxLB";
    btnEditImg.src =
      "https://autumn.revolt.chat/attachments/PsiPkuNbVmVeeaSwfPqXvap1luWr87prb5XP3GaYIb";
    checkbox.type = "checkbox";

    //Clases y Ids//
    if (e.complete) {
      checkbox.className = "unchecked";
    } else {
      checkbox.className = "checked";
    }
    borderTask.className = "borderTask";
    divContent.className = "divContent";
    divContent.id = e.id;
    btnDelete.className = "btnDelete";
    btnEdit.className = "btnEdit";
    btnDeleteImg.className = "btnDeleteImg";
    btnEditImg.className = "btnEditImg";
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
    borderTask.appendChild(divContent);
    taskList.appendChild(borderTask);

    //Funciones//
    checkbox.addEventListener("click", async () => {
      if (e.id === divContent.id) {
        if (e.complete) {
          e.complete = false;
        } else {
          e.complete = true;
        }
      }
      await putData(sessionId, { tasks: tasks });
    });

    btnEdit.addEventListener("click", async () => {
      renderModal(e.task, tasks);
    });

    btnDelete.addEventListener("click", async () => {
      if (e.id === divContent.id) {
        let index = tasks.indexOf(e);
        tasks.splice(index, 1);
        await putData(sessionId, { tasks: tasks });
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
  txtPreview.textContent = `Editar: ${task}`;

  //Clases//
  btnEdit.className = "btnEdit";
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
    }
  });

  btnClose.addEventListener("click", function () { //Cierra el modal
    document.body.removeChild(modal);
  });
}
