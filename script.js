// Variables globales
const apiUrl = "https://647687e29233e82dd53a1cb7.mockapi.io/usuarios";
let users = [];
const createButton = document.querySelector('.create');
createButton.addEventListener("click", () => addUser())

// Función para obtener los usuarios de la API...

async function getUsers() {
  try {
    const response = await fetch(apiUrl);
    users = await response.json();
    displayUsers();
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
  }
}

// Función para mostrar los usuarios en la tabla...

function displayUsers() {
  const tableBody = document.querySelector("#userTable tbody");
  tableBody.innerHTML = "";

  users.forEach((user) => {
    const row = document.createElement("tr");

    const avatarCell = document.createElement("td");
    const avatarImg = document.createElement("img");
    avatarImg.src = user.avatar;
    avatarImg.width = 50;
    avatarImg.height = 50;
    avatarCell.appendChild(avatarImg);
    row.appendChild(avatarCell);

    const nameCell = document.createElement("td");
    nameCell.textContent = user.name;
    row.appendChild(nameCell);

    const addressCell = document.createElement("td");
    addressCell.textContent = user.address;
    row.appendChild(addressCell);

    const telephoneCell = document.createElement("td");
    telephoneCell.textContent = user.telephone;
    row.appendChild(telephoneCell);

    const emailCell = document.createElement("td");
    emailCell.textContent = user.email;
    row.appendChild(emailCell);

    const actionsCell = document.createElement("td");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => showEditForm(user));
    actionsCell.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteUser(user.id));
    actionsCell.appendChild(deleteButton);

    row.appendChild(actionsCell);

    tableBody.appendChild(row);
  });
}

// Función para mostrar el formulario de edición de usuario...

function showEditForm(user) {
  const form = document.querySelector("#userForm");
  form.style.display = "block";

  const avatarInput = document.querySelector("#avatarInput");
  const nameInput = document.querySelector("#nameInput");
  const addressInput = document.querySelector("#addressInput");
  const telephoneInput = document.querySelector("#telephoneInput");
  const emailInput = document.querySelector("#emailInput");

  const formTitle = document.querySelector("#formTitle");
  formTitle.innerHTML = "EDITAR USUARIO";

  
  avatarInput.value = user.avatar;
  nameInput.value = user.name;
  addressInput.value = user.address;
  telephoneInput.value = user.telephone;
  emailInput.value = user.email;
  
  const closeButton = document.querySelector("#close");
  closeButton.addEventListener("click", ()=> closeForm())

  const addUserForm = document.querySelector("#addUserForm");
  addUserForm.onsubmit = (event) => {
    event.preventDefault();
    updateUser(user.id);
  };
}

// Función para agregar un nuevo usuario...

function addUser() {
  const form = document.querySelector("#userForm");
  form.style.display = "block";

  const avatarInput = document.querySelector("#avatarInput");
  const nameInput = document.querySelector("#nameInput");
  const addressInput = document.querySelector("#addressInput");
  const telephoneInput = document.querySelector("#telephoneInput");
  const emailInput = document.querySelector("#emailInput");

  const formTitle = document.querySelector("#formTitle");
  formTitle.innerHTML = "AGREGAR USUARIO";
  
  avatarInput.value = "";
  nameInput.value = "";
  addressInput.value = "";
  telephoneInput.value = "";
  emailInput.value = "";
  
  const closeButton = document.querySelector("#close");
  closeButton.addEventListener("click", ()=> closeForm())
  
  const addUserForm = document.querySelector("#addUserForm");  
  addUserForm.onsubmit = (event) => {
    event.preventDefault();
    saveUser();
  };
}

// Función para guardar un nuevo usuario...

async function saveUser() {
  const avatarInput = document.querySelector("#avatarInput");
  const nameInput = document.querySelector("#nameInput");
  const addressInput = document.querySelector("#addressInput");
  const telephoneInput = document.querySelector("#telephoneInput");
  const emailInput = document.querySelector("#emailInput");

  const newUser = {
    avatar: avatarInput.value,
    name: nameInput.value,
    address: addressInput.value,
    telephone: telephoneInput.value,
    email: emailInput.value,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      const user = await response.json();
      users.push(user);
      displayUsers();
      closeForm();
    } else {
      console.error("Error al guardar el usuario:", response.status);
    }
  } catch (error) {
    console.error("Error al guardar el usuario:", error);
  }
}

// Función para actualizar los datos de un usuario existente...

async function updateUser(userId) {
  const avatarInput = document.querySelector("#avatarInput");
  const nameInput = document.querySelector("#nameInput");
  const addressInput = document.querySelector("#addressInput");
  const telephoneInput = document.querySelector("#telephoneInput");
  const emailInput = document.querySelector("#emailInput");

  const updatedUser = {
    avatar: avatarInput.value,
    name: nameInput.value,
    address: addressInput.value,
    telephone: telephoneInput.value,
    email: emailInput.value,
  };

  try {
    const response = await fetch(`${apiUrl}/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    if (response.ok) {
      const userIndex = users.findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        displayUsers();
        closeForm();
      }
    } else {
      console.error("Error al actualizar el usuario:", response.status);
    }
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
  }
}

// Función para borrar un usuario...

async function deleteUser(userId) {
  try {
    const response = await fetch(`${apiUrl}/${userId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      users = users.filter((user) => user.id !== userId);
      displayUsers();
    } else {
      console.error("Error al borrar el usuario:", response.status);
    }
  } catch (error) {
    console.error("Error al borrar el usuario:", error);
  }
}

// Función para cerrar el formulario...

function closeForm() {
  const form = document.querySelector("#userForm");
  form.style.display = "none";
}

// Cargar usuarios al cargar la página...

window.addEventListener("DOMContentLoaded", getUsers);
