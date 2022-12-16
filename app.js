// Varriables
const API =
  "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";
const API_Categories = "https://opentdb.com/api_category.php";

const form = document.querySelector("#form");
const cards = document.querySelector(".card");

const categorySelect = document.querySelector("#category");
const typeSelect = document.querySelector("#type");
const difficultySelect = document.querySelector("#difficulty");

const btnGoTrivia = document.querySelector("#goTrivia");

const objSearch = {
  catego: "",
  type: "",
  difficult: "",
};

//Create a Promise
const getCategories = (categories) =>
  new Promise((resolve) => {
    resolve(categories);
  });

form?.addEventListener("submit", goTrivia);

// La funcion que ejecuta el DOM
eventListeners();

function eventListeners() {
  document.addEventListener("DOMContentLoaded", consultCategory);
  //   consultCategory();

  categorySelect.addEventListener("change", readValue);
  typeSelect.addEventListener("change", readValue);
  difficultySelect.addEventListener("change", readValue);
}

function consultCategory() {
  fetch(API_Categories)
    .then((answer) => answer.json())
    .then((resolve) => getCategories(resolve.trivia_categories))
    .then((categories) => SelectCategories(categories));
}

function SelectCategories(categories) {
  categories.forEach((catego) => {
    const { id, name } = catego;

    const option = document.createElement("option");
    option.value = id;
    option.textContent = name;

    categorySelect.appendChild(option);
  });
}

function readValue(e) {
  objSearch[e.target.name] = e.target.value;
  console.log(objSearch);
}

// Validar formulario
// function validarFormulario(e) {}

// Spinner
function goTrivia(e) {
  e.preventDefault();

  //validar
  const { catego, type, difficult } = objSearch;

  if (catego === "" || type === "" || difficult === "") {
    showAlert("Todos los campos son obligatorios");
    return;
  }

  if (form) {
    // Mostrar Snipper
    const spinner = document.querySelector("#spinner");
    spinner.style.display = "flex";

    // Despues de 3 segundos ocultar el spinner y cambiar de pantalla
    setTimeout(() => {
      spinner.style.display = "none";
      //   window.location = "/trivia.html";
    }, 3000);
  }

  // Consultar la API con sus resultados
  consultAPI();
}

// Show Message
function showAlert(msg) {
  const existError = document.querySelector(".error");

  if (!existError) {
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("error");

    //   Mensaje de error
    divMensaje.textContent = msg;

    form.appendChild(divMensaje);

    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }
}

function consultAPI() {
  //exatrer valores
  const { catego, difficult, type } = objSearch;

  const url = `https://opentdb.com/api.php?amount=10&category=${catego}&difficulty=${difficult}&type=${type}`;

  fetch(url)
    .then((answer) => answer.json())
    .then((trivia) => {
      console.log(trivia.results);
      showTriviaHTML(trivia.results);
    });
}

function showTriviaHTML(trivia) {
  trivia.forEach((triv) => {
    const { question, correct_answer, incorrect_answers } = triv;

    const questionsTable = document.createElement("div");
    questionsTable.classList.add("p-3");

    // for (let i = 0; i < incorrect_answers.length; i++) {
    const aswer0 = incorrect_answers[0];
    const aswer1 = incorrect_answers[1];
    const aswer2 = incorrect_answers[2];

    // console.log(aswers0);

    // trivia.forEach((element) => {

    questionsTable.classList.add("text-left");

    questionsTable.innerHTML = `
    <table class="table table-dark table-striped ">              
                  <tbody>
                    <tr>
                      <th id="number" scope="row"></th>
                      <td id="quest" colspan="4" >${question}</td>
                      </tr>

                      <tr>
                        <td>
                          <div class="form-check">
                            <input class="form-check-input" type="radio" name="${correct_answer}" id="${correct_answer}">
                              <label class="form-check-label" for="${correct_answer}">
                                ${correct_answer}
                            </label>
                          </div>
                        
                      </td>
                      

                      
                        <td>
                          <div class="form-check">
                            <input class="form-check-input" type="radio" name="${aswer0}" id="${aswer0}">
                              <label class="form-check-label" for="${aswer0}">
                                ${aswer0}
                            </label>
                          </div>
                        
                      </td>

                      
                        <td>
                          <div class="form-check">
                            <input class="form-check-input" type="radio" name="${aswer1}" id="${aswer1}">
                              <label class="form-check-label" for="${aswer1}">
                                ${aswer1}
                            </label>
                          </div>
                        
                      </td>

                      
                        <td>
                          <div class="form-check">
                            <input class="form-check-input" type="radio" name="${aswer2}" id="${aswer2}">
                              <label class="form-check-label" for="${aswer2}">
                                ${aswer2}
                            </label>
                          </div>
                        </td>
                      </tr>
                  </tbody>
                </table>
                `;
    // }
    // });
    form.appendChild(questionsTable);
  });
}
