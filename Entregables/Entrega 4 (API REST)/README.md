# PROGRAMACION BACKEND

# Comisión #32095

# Desafio 4

## Consigna:
---

Realizar un proyecto de servidor basado en node.js y express que ofrezca una API RESTful de productos. En detalle, que incorpore las siguientes rutas:

- GET '/api/productos' -> devuelve todos los productos
- GET '/api/productos/:id' -> devuelve un producto según su id
- POST '/api/productos' -> recibe y agrega un productos, y lo devuelve con su id asignado
- PUT '/api/productos/:id' -> Recibe y actualiza un producto según su id
- DELETE '/api/productos/:id' -> Elimina un producto según su id

### Observaciones:
---

- Cada producto estará representado por un objeto con el siguiente formato:

>>
    [
        {
    		"title": "Redragon Horus K621 TKL",
            "price": "$13.500",
            "thumbnail": "https://cdn.shopify.com/s/files/1/0606/6529/9176/products/TKL-2_79565deb-364f-4b52-a3c2-22e34d19aeed_800x.jpg?v=1653779226",
            "id": 1
    	}
    ]
>>

- Cada ítem almacenado dispondrá de un id numérico proporcionado por el backend, comenzando en 1, y que se irá incrementando a medida que se incorporen productos. Ese id será utilizado para identificar un producto que va a ser listado en forma individual. 

- Para el caso de que un producto no exista, se devolverá el objeto:
>>
    { error: 'producto no encontrado' }
>>

- Implementar la API en una clase separada, utilizando un array como soporte de persistencia de memoria

- Incorporar el Router de express en la url base '/api/productos' y configurar todas las subrutas en base a este

- Crear un espacio público de servidor que contenga un documento index.html con un formulario de ingreso de productos con los datos apropiados

- El servidor debe estar basado en express y debe implementar los mensajes de conexión al puerto 8080 y en caso de error, representar la descripción del mismo

- Las respuestas del servidor serán en formato JSON. La funcionalidad será probada a través de Postman y del formulario de ingreso

### Método de entrega:
---

Link a un repositorio en GitHub con el proyecto cargado

- No inluír la carpeta _node_modules_

