import { getUserData, putData, deleteData } from "./fetch.js";
import { renderTasks } from "./render.js";

let sessionId = sessionStorage.getItem("id");
let titulo = document.getElementById("ttlo");

document.getElementById("inputTask").addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      if (inputTask.value.trim() !== "") {
        const userData = await getUserData(sessionId);
        await postTasks(userData.tasks, inputTask.value);
        taskList.innerHTML = "";
        await loadUser();
      } else {
        console.log("ingrese texto");
      }
    }
  });

document.getElementById("btnTask").addEventListener("click", async () => {
  if (inputTask.value.trim() !== "") {
    const userData = await getUserData(sessionId);
    await postTasks(userData.tasks, inputTask.value);
    taskList.innerHTML = "";
    await loadUser();
  } else {
    console.log("ingrese texto");
  }
});

export const loadUser = async () => {
  const userData = await getUserData(sessionId);
  console.log(userData);
  titulo.textContent = `Bienvenido, ${userData.user}`;
  renderTasks(userData.tasks);
};
loadUser();

const postTasks = async (userTasks, task) => {
  let newTask = {
    task: task,
    complete: false,
    id: generateUUID(),
  };
  userTasks.push(newTask);
  await putData(sessionId, { tasks: userTasks });
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
