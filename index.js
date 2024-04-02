/*-------Declaro el array de Pizzas disponibles--------*/
const pizzas = [
  {
    id: 1,
    nombre: "Pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },
  {
    id: 2,
    nombre: "Pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },
  {
    id: 3,
    nombre: "Pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },
  {
    id: 4,
    nombre: "Pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },
  {
    id: 5,
    nombre: "Pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];

/*-------Llamo a los elementos del DOM-----------------*/
const searchForm = document.getElementById("searchForm");
const pizzaIdInput = document.getElementById("pizzaId");
const pizzaContainer = document.getElementById("pizzaContainer");
const errorMessage = document.getElementById("form_error");

// Funcion para validar que el campo no este vacio
const isEmpty = (input) => {
  return !input.value.trim().length;
};

// Funcion para mostrar el error
const showError = (message) => {
  errorMessage.textContent = message;
};

// Funcion foundPizza valida si se encuentro la pizza o no

const foundPizza = () => {
  if (isEmpty(pizzaIdInput)) {
    showError("Por favor, ingresar un número");
    return null; // Retornar null en lugar de un valor booleano
  }

  const pizza = pizzas.find(
    (pizza) => pizza.id === parseInt(pizzaIdInput.value.trim())
  );

  if (!pizza) {
    showError("No se encontró ninguna pizza con ese ID.");
    return null; // Retornar null si no se encuentra la pizza
  }

  errorMessage.textContent = "";
  return pizza; // Retornar la pizza encontrada
};

// Funcion search

const search = (e) => {
  e.preventDefault();
  const pizza = foundPizza();
  if (pizza) {
    renderPizzaCard(pizza);
    localStorage.setItem("lastSearchedPizza", JSON.stringify(pizza)); // Guardo la pizza encontrada
    pizzaContainer.style.display = "block"; // muestro la card
  } else {
    localStorage.removeItem("lastSearchedPizza"); // Elimino la última pizza encontrada del localStorage si la ultima busqeuda no trajo resultados
    pizzaContainer.style.display = "none"; // Oculto la card
  }
};

// Renderizar la card

const renderPizzaCard = (pizza) => {
  const pizzaCard = document.createElement("div");
  pizzaCard.classList.add("card");
  pizzaCard.innerHTML = `
                <h2>${pizza.nombre}</h2>
                <img src="${pizza.imagen}" alt="${pizza.nombre}">
                <p>Precio: $${pizza.precio}</p>
            `;
  pizzaContainer.innerHTML = "";
  pizzaContainer.appendChild(pizzaCard);
};

//Funcion init

const init = () => {
  searchForm.addEventListener("submit", search);
  const lastSearchedPizza = JSON.parse(
    localStorage.getItem("lastSearchedPizza")
  );
  if (lastSearchedPizza) {
    renderPizzaCard(lastSearchedPizza);
  }
};

init();
