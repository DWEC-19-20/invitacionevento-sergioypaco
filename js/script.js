window.addEventListener("load", inicio);

function inicio(){
    
    document.getElementById("invitar").addEventListener("click", addInv);
    document.getElementById("ocultar").addEventListener("click", ocultar);
    
    for(let c = 0 ; c < document.getElementsByClassName("borrar").length ; c++){
        
        document.getElementsByClassName("borrar")[c].addEventListener("click", borrar);
        
    }

    for(let c = 0 ; c < document.getElementsByClassName("editar").length ; c++){
        
        document.getElementsByClassName("editar")[c].addEventListener("click", editar);
        
    }

    for(let c = 0 ; c < document.getElementsByClassName("confirmar").length ; c++){
        
        document.getElementsByClassName("confirmar")[c].addEventListener("click", confirmado);
        
    }
    
}

function addInv(e){

    e.preventDefault();
 
    var invitado = document.getElementById("invitado");

    if(invitado.value == ""){
  
        invitado.placeholder = "No puede estar vacío.";
        return false;
  
    }

    for(let c = 0 ; c < document.getElementsByTagName("span").length ; c++){

        if(document.getElementsByTagName("span")[c].innerHTML == invitado.value){

            invitado.value = "";
            invitado.placeholder = "Invitado repetido.";
            return false;

        }

    }

    var nuevo = document.createElement("li");
    var nombre = document.createElement("span");
    
    nombre.innerHTML = document.getElementById("invitado").value;
    nuevo.appendChild(nombre);
    invitado.value = "";

    var confirmacion = document.createElement("label");
    confirmacion.innerHTML = "Confirmed";
    var check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.addEventListener("click", confirmado);
    confirmacion.appendChild(check);
    nuevo.appendChild(confirmacion);

    var editarB = document.createElement("button");
    editarB.innerHTML = "edit";
    editarB.setAttribute("class", "editar");
    editarB.addEventListener("click", editar);
    nuevo.appendChild(editarB);

    var borrarB = document.createElement("button");
    borrarB.innerHTML = "remove";
    borrarB.setAttribute("class", "borrar");
    borrarB.addEventListener("click", borrar);
    nuevo.appendChild(borrarB);

    document.getElementById("invitedList").appendChild(nuevo);

}