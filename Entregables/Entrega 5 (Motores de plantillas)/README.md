# PROGRAMACION BACKEND

# Comisión #32095

# Desafio 4

## Consigna:

---

1. Utilizando la misma API de productos del proyecto entregables de la clase anterior, construir un web server (no REST) que incorpore:

   a - Un formulario de carga de productos en la ruta raíz (configurar la ruta '/productos' para recibir el POST, y redirigir al mismo formulario).

   b - Una vista de los productos cargados (utilizando plantillas de handlebars) en la ruta GET '/productos'

   c - Ambas páginas contarán con un botón que redirija a la otra

2. Manteniendo la misma funcionalidad reemplazar el motor de plantillas handlebars por pug

3. Manteniendo la misma funcionalidad reemplazar el motor de plantillas handlebars por ejs

4. Por escrito, indicar cuál de los tres motores de plantillas prefieres para tu proyecto y por qué

### Aspectos a incluír:

---

- Realizar las plantillas correspondientes que permitan recorrer el array de productos y representarlo en forma de tabla dinámica, siendo sus cabeceras el nombre de producto, el precio y su foto (la foto se mostrará como una imágen en la tabla)

- En el caso de no encontrarse datos, se mostrará el mensaje: 'No hay productos'

### Sugerencias:

---

- Utilizar [iconfinder](https://www.iconfinder.com/free_icons) para obtener la url de las imágenes de los productos (click derecho sobre la imágen -> copiar la dirección de la imagen)

- Utilizar bootstrap para maquetar la vista creada por dicho motor de plantillas y el formulario de ingreso de productos

### Método de entrega:

---

- Link a un repositorio en GitHub con los tres proyectos en carpetas separadas

- No inluír la carpeta _node_modules_
