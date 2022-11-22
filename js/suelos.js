(function() {


    let iduser = 0;
    var editar = false;
    
    obtener();
    function obtener(){
        $(".table tbody").html(""); //limpia la tabla
    
        let i=0;
    fetch('http://localhost:3001/api/riegos/getFormSuelos')
    .then(resp => resp.json())
    .then(resp => {
        resp.forEach(element => {
         
            console.log(i, resp[i].humedad)
            $("#tbodysuelo").append('<tr class="table-active"><td class="table-active" style="background-color: green; text-align: center; color:white">'+
            element.id_rsuelo+'</td><td class="table-active" style="background-color: green; text-align: center; color:white">'+
            element.fecha+'</td><td class="table-active" style="background-color: green; text-align: center; color:white">'+
            element.cultivo_revisado+'</td><td class="table-active" style="background-color: green; text-align: center; color:white">'+
            element.rancho_revisado+'</td><td class="table-active" style="background-color: green; text-align: center; color:white">'+
            element.metodo_aplicacion+'</td><td class="table-active" style="background-color: green; text-align: center; color:white">'+
            element.status_producto+'</td><td style="background-color: green; text-align: center; color:white">'+
            element.humedad+'</td><td style="background-color: green; text-align: center; color:white">'+
            element.presion_riego_valvula+'</td><td style="background-color: green; text-align: center; color:white">'+
            element.presion_riego_cintilla_manguera+'</td><td style="background-color: green; text-align: center; color:white">'+
            element.ph_gotero+'</td><td style="background-color: green; text-align: center; color:white">'+
            element.ph_bomba+'</td><td style="background-color: green; text-align: center; color:white">'+
            element.ph_tierra+'</td><td style="background-color: green; text-align: center; color:white">'+
            element.ce_gotero+'</td><td style="background-color: green; text-align: center; color:white">'+
            element.ce_bomba+'</td><td style="background-color: green; text-align: center; color:white">'+
            element.ce_tierra+'</td><td style="background-color: green; text-align: center; color:white">'+
            element.evapotranspiracion+'</td><td style="background-color: green; text-align: center; color:white">'+
            element.comentario_general+'</td><td style="background-color: green; text-align: center; color:white"><button class="eliminar-suelo btn-danger" data-id="'+element.id_rsuelo+'">Eliminar</button></tr>')
            i=i+1;
        });
    })
    
    
    }
    
    $(document).on('click', '.editar', function () {
               iduser = $(this).data("id");  
               PintarUsuario(iduser);
               editar = true;
            });
    
            function PintarUsuario(iduser){
    
    $.get("http://localhost:3001/api/riegos/getFormSuelos" + iduser)
    .done(function( response ) {
        
        $("#txtnombres").val(response.Name),
        $("#txtdescription").val(response.Description),
        $("#txtdocument").val(response.Quantity)
      });
    }
        
    
    
        document.getElementById("savesuelo").addEventListener('click', () => {
     
          if (editar == false) {
            var data = {
              fecha : $("#txtfecha").val(),
              cultivo_revisado : $("#txtcultivo_revisado").val(),
              rancho_revisado : $("#txtrancho_revisado").val(),
              metodo_aplicacion : $("#txtmetodo_aplicacion").val(),
              status_producto : $("#txtstatus_producto").val(),
              humedad : $("#txthumedad").val(),
              presion_riego_valvula : $("#txtpresion_riego_valvula").val(),
              presion_riego_cintilla_manguera : $("#txtpresion_riego_cintilla_manguera").val(),
              ph_gotero : $("#txthp_gotero").val(),
              ph_bomba : $("#txtph_bomba").val(),
              ph_tierra : $("#txtph_tierra").val(),
              ce_gotero : $("#txtce_gotero").val(),
              ce_bomba : $("#txtce_bomba").val(),
              ce_tierra : $("#txtce_tierra").val(),
              evapotranspiracion: $("#txtevapotranspiracion").val(),
              comentario_general : $("#txtcomentario").val(),
                }
    
                fetch('http://localhost:3001/api/riegos/getFormSuelos', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then( resp => resp.json())
                .then( resp => {
                    console.log(resp)
                    if (resp.status != 'ERROR') {
      document.getElementById("miForm-suelo").reset();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: resp.mensaje,
        showConfirmButton: true,
        timer: 2500
      })
      obtener();
                    }else{
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: resp.mensaje,
                            showConfirmButton: false,
                            timer: 2500
                          }) 
                    }
                    
                } )
                .catch(error => {
                    console.log("error de peticion")
                    console.log(error)
                })
              
           
          }else{
            var data = {
                      id : iduser,
                      fecha : $("#txtfecha").val(),
              Cultivo_Revisado : $("#txtcultivo_revisado").val(),
              Rancho_revisado : $("#txtrancho_revisado").val(),
              Metodo_aplicacion : $("#txtmetodo_aplicacion").val(),
              Status_producto : $("#txtstatus_producto").val(),
              Humedad : $("#txthumedad").val(),
              Presion_riego_valvula : $("#txpresion_riego_valvula").val(),
              Presion_riego_cintilla_manguera : $("#txpresion_riego_cintilla_manguera").val(),
              Ph_gotero : $("#txthp_gotero").val(),
              ph_bomba : $("#txtph_bomba").val(),
              ph_tierra : $("#txtph_tierra txtph_tierra").val(),
              Ce_gotero : $("#txtce_gotero").val(),
              Ce_bomba : $("#txtce_bomba").val(),
              Ce_tierra : $("#txce_tierra").val(),
              Evapotranspiracion: $("#txtevapotranspiracion").val(),
              Comentario : $("#txtcomentario").val(),
                }
    
                    $.ajax({
                    method: "PUT",
                    url: "http://localhost:3001/api/riegos/getFormSuelos"+iduser,
                    contentType: 'application/json',
                    data: JSON.stringify(data), // access in body
                    })
                    .done(function( response ) {
                        console.log(response);
                        if(response){
                            alert("Se guardaron los cambios");
                          
                        }else{
                            alert("Error al Modificar")
                        }
                    });
                    editar = false;
          }
    })
    
      
    
    $(document).on('click', '.eliminar-suelo', function () {
        iduser= $(this).data("id");
    console.log(iduser)
        fetch('http://localhost:3001/api/riegos/getFormSuelos/'+iduser+'', {
            method: 'DELETE',
        })
        .then( resp => resp.json())
        .then( resp => {
            console.log(resp)
            if(resp.status == 'Eliminación con éxito'){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: resp.status,
                    showConfirmButton: true,
                    timer: 2500
                  })
                  obtener();
                  showTodos();
            }
            
        })
        .catch(error => {
            console.log("error de peticion")
            console.log(error)
        }) 
        showTodos();
    });
    
    
                 //RANCHOS-ESTACIÓN
       
                
              
            
            var cultivo_suelo = "";
            //CULTIVOS
    
        
    
           
           
             fetch('https://api.gec.org.mx/api/getCecos/')
       .then(resp => resp.json())
       .then( respObj => {
        let i = 0;
         respObj.forEach(respuesta => {
           
             $("#txtrancho_revisado").append("<option id="+respuesta.CULTIVO+" value="+respuesta.CODIGO+"_"+respuesta.DESCRIPCION+">"+respuesta.CODIGO+"-"+respuesta.DESCRIPCION+"</option>")
             
           
           i=i+1;
         });
         
       });
       document.getElementById("txtcultivo_revisado").addEventListener('change', () => {
        
        cultivo_suelo = document.getElementById("txtcultivo_revisado").value;
    
        const ProductListSuelo = document.querySelectorAll("#"+cultivo_suelo);
    for (let i = 0; i < ProductListSuelo.length; i++) {
      ProductListSuelo[i].style.display = "inline";
    }
        
       })
    
       document.getElementById("txtrancho_revisado").addEventListener('change', () => {
    
        const ProductListSuelo = document.querySelectorAll("#"+cultivo_suelo);
    for (let i = 0; i < ProductListSuelo.length; i++) {
      ProductListSuelo[i].style.display = "none";
    }
        
       })

    //-------------------------------------------------------------------------------------------------------------------------

    'use strict';
  
    var ENTER_KEY = 13;
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
      $("#s-off").html(""); //limpia la tabla
        db.allDocs({include_docs: true, ascending: true}, function(err, doc) {
            redrawTodosUI(doc.rows);
            console.log(doc.rows.length)
            $('#s-off').append(doc.rows.length)
          });
    }
  
    function checkboxChanged(todo, event) {
        console.log(todo)
        console.log(event)
      todo.completed = event.target.checked;
  db.put(todo);

    }
  
    // User pressed the delete button for a todo, delete it
    function deleteButtonPressed(todo) {
      db.remove(todo);
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
  
      var label = document.createElement('label');z
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
      
      todos.forEach(function(todo) {
        console.log(todo.doc.fecha)
        $("#tbodysuelo_off").append('<p style="background-color: orangered; text-align: center; color:white">'+
        'Registro: '+n_suelos+'</p><p style="background-color: green; text-align: center; color:white">'+
        'Clave: '+todo.doc._id+'</p><p style="background-color: green; text-align: center; color:white">'+
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
        'Comentario: '+todo.doc.comentario+'</p><button class="editar-suelo-local btn-success" data-dismiss="modal" data-id="'+todo.doc._id+'" >Subir a la nube</button>&nbsp'+
        '<button class="eliminar-suelo-local btn-danger" data-id="'+todo.doc._id+'">Eliminar</button>')
        n_suelos = n_suelos+1;
      });
    }

    $(document).on('click', '.editar-suelo-local', function () {
      let id_suelo= $(this).data("id");
      db.allDocs({include_docs: true, ascending: true}, function(err, doc) {
        sueloform(doc.rows, id_suelo);
      });

   });

   function sueloform(todos, id_suelo) {
    todos.forEach(function(todo) {
      console.log("cllave-subir: ",id_suelo)
      if (id_suelo == todo.doc._id) {
      var data = {
        fecha : todo.doc.fecha,
        cultivo_revisado : todo.doc.cultivo,
        rancho_revisado : todo.doc.rancho_revisado,
        metodo_aplicacion : todo.doc.metodo_aplicacion,
        status_producto : todo.doc.status_producto,
        humedad : todo.doc.humedad,
        presion_riego_valvula : todo.doc.presion_riego_valvula,
        presion_riego_cintilla_manguera : todo.doc.presion_riego_cintilla_manguera,
        ph_gotero : todo.doc.hp_gotero,
        ph_bomba : todo.doc.ph_bomba,
        ph_tierra : todo.doc.ph_tierra,
        ce_gotero : todo.doc.ce_gotero,
        ce_bomba : todo.doc.ce_bomba,
        ce_tierra : todo.doc.ce_tierra,
        evapotranspiracion: todo.doc.evapotranspiracion,
        comentario_general : todo.doc.comentario,
          }
          fetch('http://localhost:3001/api/riegos/getFormSuelos', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    }
})
.then( resp => resp.json())
            .then( resp => {
                console.log(resp)
                if (resp.status != 'ERROR') {
  document.getElementById("miForm-suelo").reset();
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: resp.mensaje,
    showConfirmButton: true,
    timer: 2500
  })
  obtener()
  showTodos()
                }else{
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: resp.mensaje,
                        showConfirmButton: false,
                        timer: 2500
                      }) 
                }
                
            } )
            .catch(error => {
                console.log("error de peticion")
                console.log(error)
            })

     
      /*  document.getElementById('txtfecha').value = todo.doc.fecha;
      document.getElementById('txtcultivo_revisado').value = todo.doc.cultivo;
      document.getElementById('txtrancho_revisado').value = todo.doc.rancho_revisado;
      document.getElementById('txtmetodo_aplicacion').value = todo.doc.metodo_aplicacion;
      document.getElementById('txtstatus_producto').value = todo.doc.status_producto;
      document.getElementById('txthumedad').value = todo.doc.humedad;
      document.getElementById('txtpresion_riego_valvula').value = todo.doc.presion_riego_valvula;
      document.getElementById('txtpresion_riego_cintilla_manguera').value = todo.doc.presion_riego_cintilla_manguera;
      document.getElementById('txthp_gotero').value = todo.doc.hp_gotero;
      document.getElementById('txtph_bomba').value = todo.doc.ph_bomba;
      document.getElementById('txtph_tierra').value = todo.doc.ph_tierra;
      document.getElementById('txtce_gotero').value = todo.doc.ce_gotero;
      document.getElementById('txtce_bomba').value = todo.doc.ce_bomba;
      document.getElementById('txtce_tierra').value = todo.doc.ce_tierra;
      document.getElementById('txtevapotranspiracion').value = todo.doc.evapotranspiracion;
      document.getElementById('txtcomentario').value = todo.doc.comentario;*/
      }
    })

    
  $("#s-off").html(""); //limpia la tabla
  showTodos();
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
        
        $(".table tbody").html(""); //limpia la tabla
    })
  
    
    
    showTodos();
  
    if (remoteCouch) {
      sync();
    }
  
  })();
  
   
       
         
         