$(document).ready( () => obtenerestacion())

let iduser3 = 0;
var editar = false;

obtenerestacion();
function obtenerestacion(){

    $(".table tbody").html(""); //limpia la tabla

    let i=0;
fetch('https://api.gec.org.mx/api/riegos/getFormEstaciones')
.then(resp => resp.json())
.then(resp => {
    resp.forEach(element => {
     
        //console.log(i, resp[i].humedad)
        $("#tbodyestaciones").append('<tr><td style="background-color: green; text-align: center; color:white">'+
        element.id_rhidro+'</td><td style="background-color: green; text-align: center; color:white">'+
        element.fecha+'</td><td style="background-color: green; text-align: center; color:white">'+
        element.cultivo_revisado+'</td><td style="background-color: green; text-align: center; color:white">'+
        element.rancho_revisado+'</td><td style="background-color: green; text-align: center; color:white">'+
        element.n_estacion+'</td><td style="background-color: green; text-align: center; color:white">'+
        element.mililitros_captacion+'</td><td style="background-color: green; text-align: center; color:white">'+
        element.ph_entrada+'</td><td style="background-color: green; text-align: center; color:white">'+
        element.ce_entrada+'</td><td style="background-color: green; text-align: center; color:white">'+
        element.mililitros_dren+'</td><td style="background-color: green; text-align: center; color:white">'+
        element.ph_dren+'</td><td style="background-color: green; text-align: center; color:white">'+
        element.ce_dren+'</td><td style="background-color: green; text-align: center; color:white">'+
        element.variedad+'</td><td style="background-color: green; text-align: center; color:white">'+
        element.comentario_general+'</td><td style="background-color: green; text-align: center; color:white"><button class="eliminar-estaciones btn-danger" data-id="'+element.id_rhidro+'">Eliminar</button></td></tr>')
        i=i+1;
    });
})
    
}

$(document).on('click', '.editar', function () {
           iduser3 = $(this).data("id");  
           PintarUsuario(iduser3);
           editar = true;
        });

        function PintarUsuario(iduser3){

$.get("https://api.gec.org.mx/api/riegos/getFormEstaciones" + iduser3)
.done(function( response ) {
    
    $("#txtnombres").val(response.Name),
    $("#txtdescription").val(response.Description),
    $("#txtdocument").val(response.Quantity)
  });
}
    


    document.getElementById("saveestacion").addEventListener('click', () => {
  console.log("hola")
      if (editar == false) {
        var data = {
          fecha : $("#txtfechaestacion").val(),
          cultivo_revisado : $("#txtcultivoestacion_revisado").val(),
          rancho_revisado : $("#txtranchoestacion_revisado").val(),
          n_estacion : $("#txtnestacion_estacion").val(),
          mililitros_captacion : $("#txtmililitroscicloestacion_captacion").val(),
          ph_entrada : $("#txtphestacion_entrada").val(),
          ce_entrada : $("#txtceestacion_entrada").val(),
          mililitros_dren : $("#txtmililitrosestacion_dren").val(),
          ph_dren : $("#txtphestacion_dren").val(),
          ce_dren : $("#txtceestacion_dren").val(),
          variedad : $("#txtvariedadestacion").val(),
          comentario_general : $("#txtcomentarioestacion").val(),
            }

            fetch('https://api.gec.org.mx/api/riegos/getFormEstaciones', {
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
  document.getElementById("miForm-estacion").reset();
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: resp.mensaje,
    showConfirmButton: true,
    timer: 2500
  })
  obtenerestacion();
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
                  id : iduser3,
                  fecha : $("#txtfechaestacion").val(),
                  cultivo_revisado : $("#txtcultivoestacion_revisado").val(),
                  rancho_revisado : $("#txtranchoestacion_revisado").val(),
                  n_estacion : $("#txtnestacion_estacion").val(),
                  mililitros_captacion : $("#txtmililitroscicloestacion_captacion").val(),
                  ph_entrada : $("#txtphestacion_entrada").val(),
                  ce_entrada : $("#txtceestacion_entrada").val(),
                  mililitros_dren : $("#txtmililitrosestacion_dren").val(),
                  ph_dren : $("#txtphestacion_dren").val(),
                  ce_dren : $("#txtceestacion_dren").val(),
                  variedad : $("#txtvariedadestacion").val(),
                  comentario_general : $("#txtcomentarioestacion").val(),
            }

                $.ajax({
                method: "PUT",
                url: "https://api.gec.org.mx/api/riegos/getFormEstaciones"+iduser3,
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

  

$(document).on('click', '.eliminar-estaciones', function () {
    iduser3 = $(this).data("id");
console.log(iduser2)
    fetch('https://api.gec.org.mx/api/riegos/getFormEstaciones/'+iduser3+'', {
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



var cultivo_estacion = "";
//CULTIVOS





 fetch('https://api.gec.org.mx/api/getCecos/')
.then(resp => resp.json())
.then( respObj => {
let i = 0;
respObj.forEach(respuesta => {
    if ((respObj[i].CULTIVO == "FRESA" || respObj[i].CULTIVO == "ARANDANO") && respObj[i].MEDIO == "SUSTRATO") {
        $("#txtranchoestacion_revisado").append("<option id="+respObj[i].CULTIVO+" value="+respObj[i].CODIGO+"_"+respObj[i].DESCRIPCION+">"+respObj[i].CODIGO+"-"+respObj[i].DESCRIPCION+"</option>")
      }

i=i+1;
});

});
document.getElementById("txtcultivoestacion_revisado").addEventListener('change', () => {

cultivo_estacion = document.getElementById("txtcultivoestacion_revisado").value;

const ProductListEstacion = document.querySelectorAll("#"+cultivo_estacion);
for (let i = 0; i < ProductListEstacion.length; i++) {
ProductListEstacion[i].style.display = "inline";
}

})

document.getElementById("txtranchoestacion_revisado").addEventListener('change', () => {

const ProductListEstacion = document.querySelectorAll("#"+cultivo_estacion);
for (let i = 0; i < ProductListEstacion.length; i++) {
ProductListEstacion[i].style.display = "none";
}

})
          