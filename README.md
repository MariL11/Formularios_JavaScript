# Formularios_JavaScript

Se va a realizar tres páginas web, colgadas desde una página índice:

 - En la página principal se colgarán dos enlaces que abren cada formulario. 
 - Sección de inscripción de solicitud de admisión.
 - Creación de planes malvados.
   
Cada una de las secciones tendrá una sola página y un archivo JavaScript.  Las veremos a continuación en detalle: 

### 1. Sección de solicitud de admisión en el congreso

Este ejercicio se va a realizar con la forma con objeto regexp (antes de existir pattern, required, max, .... en HTML5) de validación de formularios.

Patrones utilizados:
- Nombre: [A-Za-zñÑ]{10,25}$
- Contraseña: (?=^[^çÇ,$])(?=^\D*\d\D*\d?\D*\d?\D*$)(?!.*where)(?!.*select)(?!.*;)(?=.**\\.\d$)(^.{8,21}$) -> Ejemplo de contraseña: Asdfg12.3

### 2. Creación de planes malvados a ofertar.

Este ejercicio se va a realizar con la forma de validación de formularios HTML5. Debe tener código Javascript que trabaje con el HTML5.

Patrones utilizados:
- Nombre: ^[A-ZÑa-zñ]+(\s[A-ZÑa-zñ]+)*$
- Código: ^[A-Za-zÑñ][0-9]{3,7}$
- País: ^[A-ZÑ][a-zñ]+(\s[A-ZÑ][a-zñ]+)*$

### Enlace
[Página principal](https://maril11.github.io/Formularios_JavaScript/html/indice.html)
