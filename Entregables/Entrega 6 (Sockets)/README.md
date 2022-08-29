# PROGRAMACION BACKEND

# Comisión #32095

# Desafio 6

## Consigna:

---

1. Modificar el último entregable para que disponga de un canal de websocket que permita representar, por debajo del formulario de ingreso, una tabla con la lista de productos en tiempo real.

   - Puede haber varios clientes conectádos simultáneamente y en cada uno de ellos se reflejarán los cambios que se realicen en los productos sin necesidad de recargar la viscar.

   - Cuando un cliente se conecte, recibirá la lista de productos a representar en la vista

2. Añadiremos al proyecto un canal de chat entre los clientes y el servidor.

### Aspectos a incluír:

---

Para la consigna 1:

- Para construir la tabla dinámica con los datos recibidos por websockets utilizar Handlebars en el frontend. Considerar usar archivos públicos para alojar la plantilla vacía, y obtenerla usando la función fetch(). - Recordar que fetch devuelve una promesa.

Para la consigna 2:

- En la parte inferior del formulario de ingreso se presentará el centro de mensajes almacenados en el servidor, donde figuren los mensajes de todos los usuarios identificados por su email.

- El formato a representar será: email(texto negrita en azul) [fecha y hora (DD/MM/YYYY HH:MM:SS)] (texto normal en marrón) : mensaje (texto italic en verde).

- Además incorporar dos elementos de entrada: uno para que el usuario ingrese su email (oblicgatorio para poder utilizar el chat) y otro para ingresar mensajes y enviarlos mediante un botón.

- Los mensajes deben persistir en el servidor en un archivo (ver segundo entregable)

### Sugerencias:

---

- Utilizar [iconfinder](https://www.iconfinder.com/free_icons) para obtener la url de las imágenes de los productos (click derecho sobre la imágen -> copiar la dirección de la imagen)

- Utilizar bootstrap para maquetar la vista creada por dicho motor de plantillas y el formulario de ingreso de productos

### Método de entrega:

---

- Link a un repositorio en GitHub con los tres proyectos en carpetas separadas

- No inluír la carpeta _node_modules_
