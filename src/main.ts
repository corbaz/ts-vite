import { v4 as uuid } from "uuid";
import Toastify from "toastify-js";

import "toastify-js/src/toastify.css";
import "./style.css";

const taskForm = document.querySelector<HTMLFormElement>("#taskForm");
const taskList = document.querySelector<HTMLDivElement>("#taskList");

interface User {
  id: string;
  email: string;
  password: string;
}

let userList: User[] = [];

// Load tasks from localstorage when the app loads
document.addEventListener("DOMContentLoaded", () => {
  userList = JSON.parse(localStorage.getItem("userList") || "[]");
  renderUsers(userList);
});

taskForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = taskForm["email"] as unknown as HTMLInputElement;
  const password = taskForm["password"] as unknown as HTMLInputElement;

  userList.push({
    id: uuid(),
    email: email.value,
    password: password.value,
  });

  localStorage.setItem("userList", JSON.stringify(userList));
  Toastify({
    text: "Usuario logueado correctamente",
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    backgroundColor: "linear-gradient(to right, #f6d365 0%, #fda085 100%)",
    stopOnFocus: true,
    onClick: () => {
      console.log("Toastify was clicked");
    },
  }).showToast();
  renderUsers(userList);
  taskForm.reset();
  email.focus();
});

function renderUsers(userList: User[]) {
  taskList!.innerHTML = "";
  userList.forEach((user) => {
    const divUser = document.createElement("div");
    divUser.className =
      "bg-zinc-800 mb-1 p-4 rounded-lg text-white hover:bg-zinc-700 hover:cursor-pointer";

    const pEmail = document.createElement("p");
    pEmail.innerText = `Email User: ${user.email}`;

    const pPassword = document.createElement("p");
    pPassword.innerText = `Password User: ${user.password}`;

    const pId = document.createElement("p");
    pId.className = "text-blue-300 text-xs my-1 text-right";
    pId.innerText = `Id: ${user.id}`;

    const buttonDelete = document.createElement("button");
    buttonDelete.className = "bg-red-500 px-2 py-1 my-2 rounded-md";
    buttonDelete.innerText = `Borrar`;
    buttonDelete.addEventListener("click", () => {
      const indexUUid = userList.findIndex((user) => user.id === user.id);
      userList.splice(indexUUid, 1);
      Toastify({
        text: "Usuario eliminado correctamentee",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #f6d365 0%, #fda085 100%)",
        stopOnFocus: true,
        onClick: () => {
          console.log("Usuario eliminado correctamente");
        },
      }).showToast();
      renderUsers(userList);
      localStorage.setItem("userList", JSON.stringify(userList));
    });

    taskList?.append(divUser);
    divUser?.append(pEmail);
    divUser?.append(pPassword);
    divUser?.append(pId);
    divUser?.append(buttonDelete);
  });
}
