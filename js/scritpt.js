// Obtener las tareas del almacenamiento local o inicializar un arreglo vacío si no hay ninguna
const itemsArray = localStorage.getItem('items')
  ? JSON.parse(localStorage.getItem('items'))
  : [];

// Evento clic para el botón "Enter"
document.querySelector('#enter').addEventListener('click', () => {
  const item = document.querySelector('#item');
  createItem(item);
});

// Evento de teclado para detectar cuando se presiona la tecla "Enter" en el campo de entrada de texto
document.querySelector('#item').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
    const item = document.querySelector('#item');
    createItem(item);
  }
});

// Función para mostrar las tareas
const displayItems = () => {
  let items = '';
  for (let i = 0; i < itemsArray.length; i++) {
    items += `  <div class="item">
                    <div class="to-do-list">
                      <div class="input-controller">
                      <textarea disabled>${itemsArray[i]}</textarea>
                      <div class="edit-controller" >
                          <i class="fa-solid fa-check deleteBtn" ></i>
                          <i class="fa-solid fa-pen-to-square editBtn"></i>
                     </div>
                    </div>
                    <div class="update-controller">
                      <button class="saveBtn">
                      <i class="fa-solid fa-floppy-disk""></i> Save
                      </button>
                     <button class="cancelBtn">
                     <i class="fa-solid fa-ban "></i>  Cancel
                     </button>
                    </div>
                 </div>
                </div>`;
  }
  document.querySelector('.to-do-list').innerHTML = items;
  activateDeleteListeners();
  activateEditListeners();
  activeteSaveListener();
  activateCancelListeners();
};

// Función para eliminar una tarea
const deleteItem = (i) => {
  itemsArray.splice(i, 1);
  localStorage.setItem('items', JSON.stringify(itemsArray));
  location.reload();
};

// Función para agregar una nueva tarea
const createItem = (item) => {
  // Elimina espacios en blanco al principio y al final del texto de la tarea
  const newItemValue = item.value.trim();
  if (newItemValue !== '') {
    itemsArray.push(newItemValue);
    localStorage.setItem('items', JSON.stringify(itemsArray));
    location.reload();
  }
};

// Función para activar los listeners de eliminar tarea
const activateDeleteListeners = () => {
  let deleteBtn = document.querySelectorAll('.deleteBtn');
  deleteBtn.forEach((db, i) => {
    db.addEventListener('click', () => {
      deleteItem(i);
    });
  });
};

// Función para activar los listeners de editar tarea
const activateEditListeners = () => {
  const editBtn = document.querySelectorAll('.editBtn');
  const updateController = document.querySelectorAll('.update-controller');
  const inputs = document.querySelectorAll('.input-controller textarea');
  editBtn.forEach((eb, i) => {
    eb.addEventListener('click', () => {
      updateController[i].style.display = 'block';
      inputs[i].disabled = false;
    });
  });
};

// Función para activar los listeners de guardar tarea editada
const activeteSaveListener = () => {
  const saveBtn = document.querySelectorAll('.saveBtn');
  const inputs = document.querySelectorAll('.input-controller textarea');
  saveBtn.forEach((sb, i) => {
    sb.addEventListener('click', () => {
      updateItem(inputs[i].value, i);
    });
  });
};

// Función para activar los listeners de cancelar edición
const activateCancelListeners = () => {
  const cancelBtn = document.querySelectorAll('.cancelBtn');
  const updateController = document.querySelectorAll('.update-controller');
  const inputs = document.querySelectorAll('.input-controller textarea');
  cancelBtn.forEach((cb, i) => {
    cb.addEventListener('click', () => {
      updateController[i].style.display = 'none';
      inputs[i].disabled = true;
    });
  });
};

// Función para actualizar una tarea editada
const updateItem = (text, i) => {
  // Elimina espacios en blanco al principio y al final del texto de la tarea editada
  const updatedItemValue = text.trim();
  // Verifica que la tarea editada no esté vacía o contenga solo espacios en blanco
  if (updatedItemValue !== '') {
    itemsArray[i] = updatedItemValue;
    localStorage.setItem('items', JSON.stringify(itemsArray));
    location.reload();
  }
};

// Función para mostrar la fecha actual
const displayDate = () => {
  let date = new Date();
  date = date.toString().split(' ');
  document.querySelector(
    '#date'
  ).innerHTML = `${date[1]} ${date[2]} ${date[3]}`;
};

// Ejecutar funciones cuando la ventana se haya cargado completamente
window.onload = () => {
  displayDate();
  displayItems();
};
