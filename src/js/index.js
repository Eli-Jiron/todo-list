import Swal from 'sweetalert2'
import { getUserData, putData, deleteData } from "./fetch.js";
import { renderTasks } from "./render.js";

let sessionId = sessionStorage.getItem("id");
let titulo = document.getElementById("ttlo");

document.getElementById("inputTask").addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      if (inputTask.value.trim() !== "") {
        await postTasks(inputTask.value);
        taskList.innerHTML = "";
        await loadUser();
      } else {
        console.log("ingrese texto");
      }
    }
  });

document.getElementById("btnTask").addEventListener("click", async () => {
  if (inputTask.value.trim() !== "") {
    await postTasks(inputTask.value);
    taskList.innerHTML = "";
    await loadUser();
  } else {
    console.log("ingrese texto");
  }
});

export const loadUser = async () => {
  if (sessionId !== null) {
    const userData = await getUserData(sessionId);
    console.log(userData);
    titulo.textContent = `Bienvenido, ${userData.user}`;
    renderTasks(userData.tasks);
  } else {
    Swal.fire({
      titleText: "Por favor registrese o inicie sesión",
      icon: "warning",
    }).then(() => {
      location.href = "register.html";
    });
  }
};
loadUser();

const postTasks = async (task) => {
  const userData = await getUserData(sessionId);
  let newTask = {
    task: task,
    complete: false,
    id: generateUUID(),
  };
  userData.tasks.push(newTask);
  await putData(sessionId, { tasks: userData.tasks });
};

const generateUUID = () => {
  let d = new Date().getTime();
  let uuid = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    let r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};
