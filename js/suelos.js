$(document).ready( () => obtener())

let iduser = 0;
var editar = false;

obtener();
function obtener(){
    $(".table tbody").html(""); //limpia la tabla

    let i=0;
fetch('https://api.gec.org.mx/api/riegos/getFormSuelos')
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

$.get("https://api.gec.org.mx/api/riegos/getFormSuelos" + iduser)
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

            fetch('https://api.gec.org.mx/api/riegos/getFormSuelos', {
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
                url: "https://api.gec.org.mx/api/riegos/getFormSuelos"+iduser,
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
console.log(iduser2)
    fetch('https://api.gec.org.mx/api/riegos/getFormSuelos/'+iduser+'', {
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
        }
        
    })
    .catch(error => {
        console.log("error de peticion")
        console.log(error)
    })
    
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
  
   
       
         
         