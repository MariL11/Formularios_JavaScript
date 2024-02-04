window.addEventListener('load',iniciar,false);

function iniciar(){

	// Al hacer click en el botón de enviar tendrá que llamar a la función validar que se encargará de validar el formulario.
	enviar.addEventListener('click', validar);

	// Al hacer click en el botón de reinicar tendrá que llamar a la función reinicio que se encargará de borrar los datos del formulario.
	borrar.addEventListener('click', borrarTodo);

	// Al soltar la tecla en el input del nombre se llamará a la función nombreMayuscula que se encargará de convertir las letras en mayúsculas.
	document.getElementById('nombre').addEventListener('keyup', nombreMayuscula);

	// Al relizarse el evento focusin en el documento se llamará a la función ponerFoco para que el input que posea el foco cambie de color.
	document.addEventListener('focusin', ponerFoco);

	// Al relizarse el evento focusout en el documento se llamará a la función quitarFoco para que el input que posea el foco cambie al color original que tenia antes del foco.
	document.addEventListener('focusout', quitarFoco);

	// Contabilizamos las visitas de la página web y mostramos por pantalla el número obtenido
	if(localStorage.value==undefined){
		localStorage.value = 1;
	}else{
		localStorage.value++;
	}

	contadorVisitas.innerHTML = "Contador de visitas: " + localStorage.value;
}

// Permite añadir un color a los elementos que tenga el foco
function ponerFoco(evento) {
    let id = evento.target.id;

	//Si el elemento no es de tipo 'reset', 'submit' o 'button' cambiará de color
    if (evento.target.type !== 'reset' && evento.target.type !== 'submit' && evento.target.type !== 'button') {
        document.getElementById(id).classList.add("foco");
    }
}

// Permite quitar el foco de los elementos del formulario
function quitarFoco(evento) {
    let id = evento.target.id;
    document.getElementById(id).classList.remove("foco");
}

// Permite restablecer el formulario
function borrarTodo(){
	resultado.innerHTML="";
	
	document.getElementById("nombre").className="";
    document.getElementById("codigo").className="";
    document.getElementById("pais").className="";

}


function validar(eventopordefecto){ // En la variable que pongamos aquí gestionaremos el evento por defecto asociado al botón de "enviar" 

	let devolver=""; 
	resultado.innerHTML="";

	// Validamos los datos introducidos con llamadas a sus funciones correspondientes.
	if (validarNombre() & validarCodigo() & planSeleccionado() & validarPais() && confirm("¿Deseas enviar el formulario?")) {
	
		eventopordefecto.preventDefault(); // Cancelamos el evento de envío por defecto asignado al boton de submit enviar.
		
		//Formato de salida de datos
		resultado.innerHTML += "<br> INFORMACIÓN INTRODUCIDA <br><br>" +
            "Nombre: " + document.getElementById('nombre').value + "<br>" +
            "Código: " + document.getElementById('codigo').value + "<br>" +
            "Tipo de plan: " + obtenerValorPlan() + "<br>" ;

		//Si hay algún dato introducido o selecciona en la casilla País, se mostrará esta información en la salida de datos si no habrá un salto de línea para dejar los datos bien posicionados
		if (document.getElementById('pais').value !== "") {
			resultado.innerHTML += "País: " + document.getElementById('pais').value + "<br><br>";
		}else{
			resultado.innerHTML += "<br>";
		}
		
		devolver=true;

    }else{
		// Cancelamos el evento de envío por defecto asignado al boton de submit enviar.
		eventopordefecto.preventDefault();		
		devolver=false;	// Salimos de la función devolviendo false.
	}

	return(devolver);
}

// Permite validar el nombre introducido en el formulario
function validarNombre(){

	let devolver = true;
	let inputNombre = document.getElementById("nombre");

	//Si es válido, se pondrá la casilla de color verde, y si no aparecerá un mensaje y se pondrá de color rojo
	if(inputNombre.checkValidity()){
		inputNombre.className="correcto";	
		document.getElementById('errorNombre').style.visibility = "hidden";

	}else{
		inputNombre.className="error";	
		document.getElementById('errorNombre').style.visibility = "visible";
		devolver=false;
	}

	return devolver;
}

// Permite poner las letras en mayúsculas de la casilla nombre
function nombreMayuscula(){
	return document.getElementById("nombre").value = document.getElementById("nombre").value.toUpperCase();
}


// Permite validar el cñodigo introducido en el formulario
function validarCodigo (){

	let devolver = true;
	let inputCodigo = document.getElementById("codigo");

	//Si es válido, se pondrá la casilla de color verde, y si no aparecerá un mensaje y se pondrá de color rojo
	if(inputCodigo.checkValidity()){
		inputCodigo.className="correcto";	
		document.getElementById('errorCodigo').style.visibility = "hidden";
		
	}else{
		inputCodigo.className="error";	
		document.getElementById('errorCodigo').style.visibility = "visible";
		devolver=false;
	}

	return devolver;
}


// Permite validar si se ha seleccionado algún plan
function planSeleccionado(){
	let devolver = false;

	// Si se ha seleccionado alguna opción desaparecerá el mensaje de aviso
	for(var i=0; i < document.getElementsByName("plan").length; i++){
		if(document.getElementsByName("plan")[i].checked){
			document.getElementById('errorPlan').style.visibility = "hidden";
			devolver = true;
		}
	}

	// Si devolver es falso aparecerá un mensaje
	if(!devolver){
		document.getElementById('errorPlan').style.visibility = "visible";
	}

	return devolver;

}

// Permite obtener el plan seleccionado
function obtenerValorPlan() {
    for (var i = 0; i < document.getElementsByName("plan").length; i++) {
        if (document.getElementsByName("plan")[i].checked) {
            return document.getElementsByName("plan")[i].value;
        }
    }
    
}

// Permite cambiar al color verde si la casilla a sido rellenada, está vacia o se ha seleccionado algún país de la lista, si no se pondrá en error porque no coincide con el patrón
function validarPais() {
    let devolver = true;
    let inputPais = document.getElementById("pais");

    if (inputPais.value === "") {
		inputPais.className = "";
		document.getElementById('errorPais').style.visibility = "hidden";

    } else if(inputPais.checkValidity()){
		document.getElementById('errorPais').style.visibility = "hidden";
        inputPais.className = "correcto";

    } else{
		inputPais.className = "error";
		document.getElementById('errorPais').style.visibility = "visible";
		devolver = false;
	}

    return devolver;
}


