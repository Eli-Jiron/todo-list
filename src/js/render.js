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
    btnDeleteImg.src = "https://autumn.revolt.chat/attachments/wFIHXe0d91Rb_yLIbiSq9ZK9NyB-QpKEuTHIC1RxLB";
    btnEditImg.src = "https://autumn.revolt.chat/attachments/PsiPkuNbVmVeeaSwfPqXvap1luWr87prb5XP3GaYIb";
    checkbox.type = "checkbox";

    //Clases y Ids//
    if (e.status) {
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
  });
};
