//  Cargar eventos en la página si existen
window.addEventListener("load", inicio);
function inicio(){
    
    document.getElementById("invitar").addEventListener("click", addInv);
    document.getElementById("ocultar").addEventListener("click", ocultar);
   
}
// Variables globales

var ocultos = false;
var editando = false;

// Añadir invitado

function addInv(e){

    e.preventDefault();
 
    var invitado = document.getElementById("invitado");

    if(comprobarValido(invitado.value.trim())){
        
        var nuevo = document.createElement("li");
        var nombre = document.createElement("span");
    
        nombre.innerHTML = document.getElementById("invitado").value.trim();
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

        if(ocultos) nuevo.style.display = 'none';
    
        document.getElementById("invitedList").appendChild(nuevo);
        invitado.placeholder = "Invitar a alguien";
    }
}

// Comprobar si el nombre del invitado es válido

function comprobarValido(invitado){

    if(invitado == ""){
        
        document.getElementById("error").innerHTML = "No puede estar vacío.";
        document.getElementById("error").style.display = 'block';
        return false;
  
    }

    var cont = 0;
    
    for(let c = 0 ; c < document.getElementsByTagName("span").length ; c++){

        if(document.getElementsByTagName("span")[c].innerHTML == invitado){

            cont++;
            
        }

    }
    
    if(editando){
        
        if(cont > 1) {
        
            document.getElementById("error").innerHTML = "Invitado repetido.";
            document.getElementById("error").style.display = 'block';
            return false;
            
        }
        
    }
    
    else if(cont > 0){
    
        document.getElementById("error").innerHTML = "Invitado repetido.";
        document.getElementById("error").style.display = 'block';
        return false;
        
    }
    
    document.getElementById("error").innerHTML = "";
    document.getElementById("error").style.display = 'none';
    
    return true;
    
}

// Filtrar invitados confirmados

function ocultar(){
    
    var li = document.getElementsByTagName("li");  
    
    if(document.getElementById("ocultar").checked){ 
        
        for(let c = 0 ; c < li.length ; c++){
            
            var x = li[c].getElementsByTagName("label")[0].getElementsByTagName("input");
            
            if(!x[0].checked) li[c].style.display = 'none';
            
            ocultos = true;
            
        }
        
    }
    
    else {
        
        for(let c = 0 ; c < li.length ; c++){
            
            li[c].style.display = 'block';
            
            ocultos = false;
            
        }
        
    }
    
}

// Editar invitado existente

function editar(e){
    
    var boton = e.target;
    var elemento = boton.parentElement.firstChild;

    editando = true;
    
    elemento.setAttribute("contentEditable", true);
    elemento.focus();   
    
    boton.innerHTML = "Guardar";
    
    boton.addEventListener("click", aceptar);
}

function aceptar(e) {
    
    var boton = e.target;
    var elemento = boton.parentElement.firstChild;
    
    if(comprobarValido(elemento.innerHTML.trim())) {
        
        elemento.setAttribute("contentEditable", false);
        elemento.parentElement.getElementsByClassName('editar')[0].innerHTML = "edit";
        editando = false;

    }

    else elemento.focus();
    
    boton.removeEventListener("click", aceptar);
}

// Borrar invitado

function borrar(e){
    
    var boton = e.target;
    var elemento = boton.parentElement;
    
    if(confirm("¿Seguro que quieres borrar esta invitación?")){
        
        elemento.remove();
        
    }
    
}

// Comprobar si el invitado ha confirmado

function confirmado(e){

    var check = e.target;
    var elemento = check.parentElement.parentElement;

    if(check.checked) elemento.setAttribute("class", "responded");

    else elemento.setAttribute("class", "");

}