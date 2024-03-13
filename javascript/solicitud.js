window.addEventListener('load',iniciar,false);

function iniciar(){

	// Al hacer click en el botón de enviar tendrá que llamar a la función validar que se encargará de validar el formulario.
	enviar.addEventListener('click', validar);

	// Al hacer click en el botón de reinicar tendrá que llamar a la función reinicio que se encargará de borrar los datos del formulario.
	reiniciar.addEventListener('click', reinicio);

	// Al mantener pulsado el botón mostrar tendrá que llamar a la función mostrarConstrasenia que se encargará mostrar la constraseña introducida.
	mostrar.addEventListener('mousedown', mostrarContrasenia);

	// Al dejar de pulsar el botón mostrar tendrá que llamar a la función ocultarConstrasenia que se encargará ocultar la constraseña introducida.
	mostrar.addEventListener('mouseup', ocultarContrasenia);

	// Al relizarse el evento focusin en el documento se llamará a la función ponerFoco para que el input que posea el foco cambie de color.
	document.addEventListener('focusin', ponerFoco);

	// Al relizarse el evento focusout en el documento se llamará a la función quitarFoco para que el input que posea el foco cambie al color original que tenia antes del foco.
	document.addEventListener('focusout', quitarFoco);
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
function reinicio(){
	resultado.innerHTML="";

	document.getElementById("nombre").className="";
	document.getElementById("nacionalidad").className="";
	document.getElementById("contrasenia").className="";
	document.getElementById("contraseniaRepeticion").className="";
}


function validar(eventopordefecto){	// En la variable que pongamos aquí gestionaremos el evento por defecto asociado al botón de "enviar" 
	
	let devolver=""; 
	resultado.innerHTML="";

	// Validamos los datos introducidos con llamadas a sus funciones correspondientes.
	if (validarNombre() & validarNacionalidad() & validarContrasenia() & comprobarIgualdadContrasenias() && confirm("¿Deseas enviar el formulario?")) {
		
		eventopordefecto.preventDefault(); // Cancelamos el evento de envío por defecto asignado al boton de submit enviar.

		//Formato de salida de datos
		resultado.innerHTML += "<br>INFORMACIÓN INTRODUCIDA <br><br>" +
                    "Nombre: " + document.getElementById('nombre').value + "<br>" +
                    "Nacionalidad: " + document.getElementById('nacionalidad').value + "<br>" +
                    "Contraseña: " + document.getElementById('contrasenia').value + "<br><br>";

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
	let patron = /[A-Za-zñÑ]{10,25}$/; //La cadena permite contener carácteres alfabéticos, tanto en mayúsculas como en mininúsyulas, asi como 'Ñ' y 'ñ' y debe tener como mínimo una longitud 
									   // de 10 carácteres y de máximo 25 carácteres.
	let devolver = true;

	//Si es válido se cambiará de color verde la casilla, y si no saldrá un mensaje y se pondrá de color rojo
	if (patron.test(document.getElementById("nombre").value)){
		document.getElementById("nombre").className="correcto";	
		devolver=true;
	}else{
		resultado.innerHTML+="- El nombre no es correcto. <br>";
		
		document.getElementById("nombre").className="error";	
		devolver=false;
	}

	return devolver;

}


// Permite validar la nacionalida seleccionada en el formulario
function validarNacionalidad(){

	let devolver = true;

	//Si la opción seleccionada es igual a 0, saldrá un menaje y se pondrá la casilla de color rojo, y si no se pondrá de color verde.
	if (document.getElementById("nacionalidad").selectedIndex==0)	{
		resultado.innerHTML+=" - Debes seleccionar una nacionalidad.<br>";

		document.getElementById("nacionalidad").className="error";	
		devolver = false;
	}else{
        document.getElementById("nacionalidad").className="correcto";
    }

	return devolver;
	
}

// Permite validar la contraseñia introducida en el formulario
function validarContrasenia(){
	let patron = /(?=^[^çÇ,$])(?=^\D*\d\D*\d?\D*\d?\D*$)(?!.*where)(?!.*select)(?!.*;)(?=.*\.\d$)(^.{8,21}$)/; 
				// (?=^[^çÇ,$]) -> La cadena no puede empezar por 'Ç', por 'ç', por ',' o ' por '$'.
				// (?!.*select)(?!.*where)(?!.*;) -> La cadena no pueder contener las palabras 'select', 'where' y el carácter ';'.
				// (?=^\D*\d\D*\d?\D*\d?\D*$) -> La cadena debe tener un número y opcionalmente un segundo o tercer número, sin tener que ser consecutivos y con otros carácteres no numéricos permitidos entre ellos.
				// (?=.*\.\d$) -> La cadena debe tener un punto precedido de un número.
				// ([^.{8,21}$) -> La cadena debe tener un minímo de 8 carácteres y un máximo de 21 carácteres.

	let devolver = true;

	//Si es válido se cambiará de color verde la casilla, y si no saldrá un mensaje y se pondrá de color rojo
	if (patron.test(document.getElementById("contrasenia").value)){
		document.getElementById("contrasenia").className="correcto";	

	}else{
		resultado.innerHTML+="- La contraseña no es correcta. <br>";
		
		document.getElementById("contrasenia").className="error";	
		devolver=false;
	}

	return devolver;

}

//Permite válidar si la contraseñia repetida es igual a la primera contraseña
function comprobarIgualdadContrasenias(){
	let devolver = true;

	//Si la contraseñia repetida es igual a la primera contraseña y no está la casilla vacía, se pondrá de color verde. Si no saldrá un mensaje y se pondrá de color.
	if((document.getElementById("contrasenia").value) === (document.getElementById("contraseniaRepeticion").value) && (document.getElementById("contraseniaRepeticion").value.length != 0 )){
		document.getElementById("contraseniaRepeticion").className="correcto";	

	}else{
		resultado.innerHTML+="- El campo Repetir Contraseña no es igual al campo Contraseña o está vacío. <br>";
		
		document.getElementById("contraseniaRepeticion").className="error";	
		devolver=false;

	}

	return devolver;
}

// Permite visualizar las contraseñas del formulario
function mostrarContrasenia(){
	document.getElementById('contraseniaRepeticion').type="text";
	document.getElementById('contrasenia').type="text";
}

// Permite ocultar las contraseñas del formulario
function ocultarContrasenia(){
	document.getElementById('contraseniaRepeticion').type="password";
	document.getElementById('contrasenia').type="password";
	
}
