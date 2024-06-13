import { getData, putData, deleteData } from "./fetch.js";

let sessionId = sessionStorage.getItem("id");
let titulo = document.getElementById("ttlo");

document.getElementById("inputTask").addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      if (inputTask.value !== "") {
        const promise = await getData();
        promise.forEach((e) => {
          if (e.id === sessionId) {
            postTasks(e.tasks, inputTask.value);
          }
        });
      } else {
        console.log("ingrese texto");
      }
    }
  });

document.getElementById("btnTask").addEventListener("click", async () => {
  if (inputTask.value !== "") {
    const promise = await getData();
    promise.forEach((e) => {
      if (e.id === sessionId) {
        postTasks(e.tasks, inputTask.value);
      }
    });
  } else {
    console.log("ingrese texto");
  }
});

const loadUser = async () => {
  const promise = await getData();
  promise.forEach((e) => {
    if (e.id === sessionId) {
      console.log(e);
      titulo.textContent = `${titulo.textContent}, ${e.user}`;
    }
  });
};
loadUser();

const postTasks = async (userTasks, task) => {
  let newTask = {
    task: task,
    status: false,
    id: userTasks.length,
  };
  userTasks.push(newTask);
  await putData(sessionId, { tasks: userTasks });
};
