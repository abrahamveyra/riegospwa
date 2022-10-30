$(document).ready( () => obtenerciclo())

let iduser2 = 0;
var editar = false;

obtenerciclo();
function obtenerciclo(){
console.log()
let i=0;

fetch('https://api.gec.org.mx/api/riegos/getFormCiclos')
.then(resp => resp.json())
.then(resp => {
    resp.forEach(element => {
     
        //console.log(i, resp[i].humedad)
        $("#tbodyciclo").append('<tr><td style="background-color: green; text-align: center; color:white">'+
        element.id_rciclo+'</td><td style="background-color: green; text-align: center; color:white">'+
        element.fecha+'</td><td style="background-color: green; text-align: center; color:white">'+
        element.cultivo_revisado+'</td><td style="background-color: green; text-align: center; color:white">'+
        element.rancho_revisado+'</td><td style="background-color: green; text-align: center; color:white">'+
        element.n_ciclo+'</td><td style="background-color: green; text-align: center; color:white">'+
        element.tiempo_ciclo+'</td><td style="background-color: green; text-align: center; color:white">'+
        element.n_base+'</td><td style="background-color: green; text-align: center; color:white">'+
        element.status_producto+'</td><td style="background-color: green; text-align: center; color:white">'+
        element.presion_riego_valvula+'</td><td style="background-color: green; text-align: center; color:white">'+
        element.presion_riego_cintilla_manguera+'</td><td style="background-color: green; text-align: center; color:white">'+
        element.ph_gotero+'</td><td style="background-color: green; text-align: center; color:white">'+
        element.ce_gotero+'</td><td style="background-color: green; text-align: center; color:white">'+
        element.mililitros_captacion+'</td><td style="background-color: green; text-align: center; color:white">'+
        element.ph_dren+'</td><td style="background-color: green; text-align: center; color:white">'+
        element.ce_dren+'</td><td style="background-color: green; text-align: center; color:white">'+
        element.mililitros_dren+'</td><td style="background-color: green; text-align: center; color:white">'+
        element.porcentaje_humedad+'</td><td style="background-color: green; text-align: center; color:white">'+
        element.evapotranspiracion+'</td><td style="background-color: green; text-align: center; color:white">'+
        element.comentario_general+'</td><td style="background-color: green; text-align: center; color:white"><button class="eliminar-ciclo btn-danger" data-id="'+element.id_rciclo+'">Eliminar</button></td></tr>')
        i=i+1;
    });
})
}

$(document).on('click', '.editar', function () {
           iduser2 = $(this).data("id");  
           PintarUsuario(iduser2);
           editar = true;
        });

        function PintarUsuario(iduser2){

$.get("https://api.gec.org.mx/api/riegos/getFormCiclos" + iduser2)
.done(function( response ) {
    
    $("#txtnombres").val(response.Name),
    $("#txtdescription").val(response.Description),
    $("#txtdocument").val(response.Quantity)
  });
}
    


    document.getElementById("saveciclo").addEventListener('click', () => {
  console.log("hola")
      if (editar == false) {
        var data = {
          fecha : $("#txtfechaciclo").val(),
          cultivo_revisado : $("#txtcultivociclo_revisado").val(),
          rancho_revisado : $("#txtranchociclo_revisado").val(),
          n_ciclo : $("#txtnciclo_ciclo").val(),
          tiempo_ciclo : $("#txttiempociclo_ciclo").val(),
          n_base : $("#txtnciclo_base").val(),
          status_producto : $("#txtstatusciclo_producto").val(),
          presion_riego_valvula : $("#txtpresionciclo_riego_valvula").val(),
          presion_riego_cintilla_manguera : $("#txtpresionciclo_riego_cintilla_manguera").val(),
          ph_gotero : $("#txtphciclo_gotero").val(),
          ce_gotero : $("#txtceciclo_gotero").val(),
          mililitros_captacion : $("#txtmililitrosciclo_captacion").val(),
          ph_dren : $("#txtphciclo_dren").val(),
          ce_dren: $("#txtceciclo_dren").val(),
          mililitros_dren : $("#txtmililitrosciclo_dren").val(),
          porcentaje_humedad : $("#txtporcentajeciclo_humedad").val(),
          evapotranspiracion : $("#txtevapotranspiracionciclo").val(),
          comentario_general : $("#txtcomentariociclo").val(),
            }
          
            fetch('https://api.gec.org.mx/api/riegos/getFormCiclos', {
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
  document.getElementById("miForm-ciclo").reset();
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: resp.mensaje,
    showConfirmButton: true,
    timer: 2500
  })
  obtenerciclo();
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
                  id : iduser2,
                  fecha : $("#txtfecha").val(),
                  cultivo_revisado : $("#txtcultivo_revisado").val(),
                  n_ciclo : $("#txtn_ciclo").val(),
                  tiempo_ciclo : $("#txttiempo_ciclo").val(),
                  status_producto : $("#txtstatus_producto").val(),
                  humedad : $("#txthumedad").val(),
                  n_base : $("#n_base").val(),
                  status_producto : $("#txtstatus_producto").val(),
                  presion_riego_valvula : $("#txtpresion_riego_valvula").val(),
                  presion_riego_cintilla_manguera : $("#txtpresion_riego_cintilla_manguera").val(),
                  ph_gotero : $("#txtph_gotero").val(),
                  ce_gotero : $("#txtce_gotero").val(),
                  mililitros_captacion : $("#txtmililitros_captacion").val(),
                  ph_dren : $("#txtph_dren").val(),
                  ce_dren: $("#txtce_dren").val(),
                  mililitros_dren : $("#txtmililitros_dren").val(),
                  porcentaje_humedad : $("#txtporcentaje_humedad").val(),
                  comentario_general : $("#txtcomentario").val(),
            }

            fetch('https://api.gec.org.mx/api/riegos/getFormCiclos', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then( resp => resp.json() )
.then( console.log )
.catch( error=> {
    console.log('error en la peticion')
    console.log(error)
} );

                editar = false;
      }
})

  

    $(document).on('click', '.eliminar-ciclo', function () {
            iduser2 = $(this).data("id");
  console.log(iduser2)
            fetch('https://api.gec.org.mx/api/riegos/getFormCiclos/'+iduser2+'', {
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



        var cultivo_ciclo = "";
        //CULTIVOS
        
        
        
        
        
         fetch('https://api.gec.org.mx/api/getCecos/')
        .then(resp => resp.json())
        .then( respObj => {
        let i = 0;
        respObj.forEach(respuesta => {
            if ((respObj[i].CULTIVO == "FRESA" || respObj[i].CULTIVO == "ARANDANO") && respObj[i].MEDIO == "SUSTRATO") {
                $("#txtranchociclo_revisado").append("<option id="+respObj[i].CULTIVO+" value="+respObj[i].CODIGO+"_"+respObj[i].DESCRIPCION+">"+respObj[i].CODIGO+"-"+respObj[i].DESCRIPCION+"</option>")
              }
        
        i=i+1;
        });
        
        });
        document.getElementById("txtcultivociclo_revisado").addEventListener('change', () => {
        
        cultivo_ciclo = document.getElementById("txtcultivociclo_revisado").value;
        
        const ProductListCiclo = document.querySelectorAll("#"+cultivo_ciclo);
        for (let i = 0; i < ProductListCiclo.length; i++) {
        ProductListCiclo[i].style.display = "inline";
        }
        
        })
        
        document.getElementById("txtranchociclo_revisado").addEventListener('change', () => {
        
        const ProductListCiclo = document.querySelectorAll("#"+cultivo_ciclo);
        for (let i = 0; i < ProductListCiclo.length; i++) {
        ProductListCiclo[i].style.display = "none";
        }
        
        })

          