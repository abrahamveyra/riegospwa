//Detectar si podemos usar Service worker
var url = window.location.href;
var swLocation = '/riegospwa/sw.js';

if (navigator.serviceWorker) {

if (url.includes('localhost')) {
    swLocation = '/sw.js'
    //console.log("localhost")
}

    navigator.serviceWorker.register(swLocation)
}


(function() {

    'use strict';
  
    var ENTER_KEY = 13;
    var newTodoDom = document.getElementById('miForm-suelo');
    var txtfecha = document.getElementById('txtfecha');
    var txtcultivo_revisado = document.getElementById('txtcultivo_revisado');
    var txtrancho_revisado = document.getElementById('txtrancho_revisado');
    var txtmetodo_aplicacion = document.getElementById('txtmetodo_aplicacion');
    var txtstatus_producto = document.getElementById('txtstatus_producto');
    var txthumedad = document.getElementById('txthumedad');
    var txtpresion_riego_valvula = document.getElementById('txtpresion_riego_valvula');
    var txtpresion_riego_cintilla_manguera = document.getElementById('txtpresion_riego_cintilla_manguera');
    var txthp_gotero = document.getElementById('txthp_gotero');
    var txtph_bomba = document.getElementById('txtph_bomba');
    var txtph_tierra = document.getElementById('txtph_tierra');
    var txtce_gotero = document.getElementById('txtce_gotero');
    var txtce_bomba = document.getElementById('txtce_bomba');
    var txtce_tierra = document.getElementById('txtce_tierra');
    var txtevapotranspiracion = document.getElementById('txtevapotranspiracion');
    var txtcomentario = document.getElementById('txtcomentario');
    var syncDom = document.getElementById('sync-wrapper');
  
    // EDITING STARTS HERE (you dont need to edit anything above this line)
  
    var db = new PouchDB('todos');
    var remoteCouch = false;
    db.changes({
      since: 'now',
      live: true
    }).on('change', showTodos);
  
    // We have to create a new todo document and enter it in the database
    function addTodo(txtfecha, txtcultivo_revisado, txtrancho_revisado, txtmetodo_aplicacion, txtstatus_producto, txthumedad, txtpresion_riego_valvula, txtpresion_riego_cintilla_manguera, txthp_gotero, txtph_bomba, txtph_tierra, txtce_gotero, txtce_bomba, txtce_tierra, txtevapotranspiracion, txtcomentario) {
        var todo = {
            _id: new Date().toISOString(),
            fecha: txtfecha,
            cultivo: txtcultivo_revisado,
            rancho_revisado: txtrancho_revisado,
            metodo_aplicacion: txtmetodo_aplicacion,
            status_producto: txtstatus_producto,
            humedad: txthumedad,
            presion_riego_valvula: txtpresion_riego_valvula,
            presion_riego_cintilla_manguera: txtpresion_riego_cintilla_manguera,
            hp_gotero: txthp_gotero,
            ph_bomba: txtph_bomba,
            ph_tierra: txtph_tierra,
            ce_gotero: txtce_gotero,
            ce_bomba: txtce_bomba,
            ce_tierra: txtce_tierra,
            evapotranspiracion: txtevapotranspiracion,
            comentario: txtcomentario,
            completed: false
          };

         /* db.put(todo, function callback(err, result) {
            console.log(txtpresion_riego_valvula)
            if (!err) {
              console.log('Successfully posted a todo!');
            }
          });*/
          db.put( todo )
          .then( Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'insertodo con exito offline',
            showConfirmButton: true,
            timer: 3500
          }))
          .catch(console.log)
    }
  
    // Show the current list of todos by reading them from the database
    function showTodos() {
      $('#s-off').html("");
        db.allDocs({include_docs: true, ascending: true}, function(err, doc) {
            redrawTodosUI(doc.rows);
            console.log(doc.rows.length)
            $('#s-off').append(doc.rows.length)
          });
    }
  
    function checkboxChanged(todo, event) {
    }
  
    // User pressed the delete button for a todo, delete it
    function deleteButtonPressed(todo) {
    }
  
    // The input box when editing a todo has blurred, we should save
    // the new title or delete the todo if the title is empty
    function todoBlurred(todo, event) {
    }
  
    // Initialise a sync with the remote server
    function sync() {
    }
  
    // EDITING STARTS HERE (you dont need to edit anything below this line)
  
    // There was some form or error syncing
    function syncError() {
      syncDom.setAttribute('data-sync-state', 'error');
    }
  
    // User has double clicked a todo, display an input so they can edit the title
    function todoDblClicked(todo) {
      var div = document.getElementById('li_' + todo._id);
      var inputEditTodo = document.getElementById('input_' + todo._id);
      div.className = 'editing';
      inputEditTodo.focus();
    }
  
    // If they press enter while editing an entry, blur it to trigger save
    // (or delete)
    function todoKeyPressed(todo, event) {
      if (event.keyCode === ENTER_KEY) {
        var inputEditTodo = document.getElementById('input_' + todo._id);
        inputEditTodo.blur();
      }
    }
  
    // Given an object representing a todo, this will create a list item
    // to display it.
    function createTodoListItem(todo) {
      var checkbox = document.createElement('input');
      checkbox.className = 'toggle';
      checkbox.type = 'checkbox';
      checkbox.addEventListener('change', checkboxChanged.bind(this, todo));
  
      var label = document.createElement('label');
      label.appendChild( document.createTextNode(todo.title));
      label.addEventListener('dblclick', todoDblClicked.bind(this, todo));
  
      var deleteLink = document.createElement('button');
      deleteLink.className = 'destroy';
      deleteLink.addEventListener( 'click', deleteButtonPressed.bind(this, todo));
  
      var divDisplay = document.createElement('div');
      divDisplay.className = 'view';
      divDisplay.appendChild(checkbox);
      divDisplay.appendChild(label);
      divDisplay.appendChild(deleteLink);
  
      var inputEditTodo = document.createElement('input');
      inputEditTodo.id = 'input_' + todo._id;
      inputEditTodo.className = 'edit';
      inputEditTodo.value = todo.title;
      inputEditTodo.addEventListener('keypress', todoKeyPressed.bind(this, todo));
      inputEditTodo.addEventListener('blur', todoBlurred.bind(this, todo));
  
      var li = document.createElement('li');
      li.id = 'li_' + todo._id;
      li.appendChild(divDisplay);
      li.appendChild(inputEditTodo);
  
      if (todo.completed) {
        li.className += 'complete';
        checkbox.checked = true;
      }
  
      return li;
    }
  
    function redrawTodosUI(todos) {
      let n_suelos = 1;
      $(".table tbody").html(""); //limpia la tabla
      todos.forEach(function(todo) {
        console.log(todo.doc.fecha)
        $("#tbodysuelo_off").append('<p style="background-color: orangered; text-align: center; color:white">'+
        'Registro: '+n_suelos+'</p><p style="background-color: green; text-align: center; color:white">'+
        'Fecha: '+todo.doc.fecha+'</p><p style="background-color: green; text-align: center; color:white">'+
        'Cultivo revisado: '+todo.doc.cultivo+'</p><p class="table-active" style="background-color: green; text-align: center; color:white">'+
        'Rancho revisado: '+todo.doc.rancho_revisado+'</p><p class="table-active" style="background-color: green; text-align: center; color:white">'+
        'Método aplicado: '+todo.doc.metodo_aplicacion+'</p><p class="table-active" style="background-color: green; text-align: center; color:white">'+
        '¿Tiene producto?: '+todo.doc.status_producto+'</p><p style="background-color: green; text-align: center; color:white">'+
        'Humedad: '+todo.doc.humedad+'</p><p style="background-color: green; text-align: center; color:white">'+
        'Presión riego valvula: '+todo.doc.presion_riego_valvula+'</p><p style="background-color: green; text-align: center; color:white">'+
        'Presion riego cint/manguera'+todo.doc.presion_riego_cintilla_manguera+'</p><p style="background-color: green; text-align: center; color:white">'+
        'Ph gotero: '+todo.doc.hp_gotero+'</p><p style="background-color: green; text-align: center; color:white">'+
        'Ph bomba: '+todo.doc.ph_bomba+'</p><p style="background-color: green; text-align: center; color:white">'+
        'Ph tierra: '+todo.doc.ph_tierra+'</p><p style="background-color: green; text-align: center; color:white">'+
        'Ce_gotero: '+todo.doc.ce_gotero+'</p><p style="background-color: green; text-align: center; color:white">'+
        'Ce bomba: '+todo.doc.ce_bomba+'</p><p style="background-color: green; text-align: center; color:white">'+
        'Ce tierra: '+todo.doc.ce_tierra+'</p><p style="background-color: green; text-align: center; color:white">'+
        'Evapotranspiración: '+todo.doc.evapotranspiracion+'</p><p style="background-color: green; text-align: center; color:white">'+
        'Comentario: '+todo.doc.comentario+'</p>')
        n_suelos = n_suelos+1;
      });
    }

    document.getElementById("savesuelo-off").addEventListener('click', () => {
      addTodo(txtfecha.value, txtcultivo_revisado.value, txtrancho_revisado.value, txtmetodo_aplicacion.value, txtstatus_producto.value, txthumedad.value, txtpresion_riego_valvula.value, txtpresion_riego_cintilla_manguera.value, txthp_gotero.value, txtph_bomba.value, txtph_tierra.value, txtce_gotero.value, txtce_bomba.value, txtce_tierra.value, txtevapotranspiracion.value, txtcomentario.value);
      txtfecha.value = '';
      txtcultivo_revisado.value = '';
      txtrancho_revisado.value = '';
      txtmetodo_aplicacion.value = '';
      txtstatus_producto.value = '';
      txthumedad.value = '',
      txtpresion_riego_valvula.value = '';
      txtpresion_riego_cintilla_manguera.value = '';
      txthp_gotero.value = '';
      txtph_bomba.value = '';
      txtph_tierra.value = '';
      txtce_gotero.value = '',
      txtce_bomba.value = '';
      txtce_tierra.value = '';
      txtevapotranspiracion.value = '';
      txtcomentario.value = '';
    })
  
    function addEventListeners() {
      newTodoDom.addEventListener('keypress', newTodoKeyPressHandler, false);
    }
  
    
    addEventListeners();
    showTodos();
  
    if (remoteCouch) {
      sync();
    }
  
  })();
  