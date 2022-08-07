# PROGRAMACION BACKEND

# Comisión #31830

# Desafio 3

## Consigna:

1. Realizar un proyecto de servidor basado en node.js que utilice el módulo express e implemente los siguientes endpoints en el puerto 8080:

- Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor
- Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos disponibles

2. Incluir un archivo de texto 'productos.txt' y utiliza la clase Contenedor del desafío anterior para acceder a los datos persistidos del servidor.

Antes de iniciar el servidor, colocar en el archivo 'productos.txt' tres productos como en el ejemplo del desafío anterior

### Método de entrega:

Link a un repositorio en Github y url de proyecto subido a glitch

- No inluír la carpeta _node_modules_

### >> Ejemplo de los productos:

    [
        {
    		"title": "Redragon Horus K621 TKL",
            "price": "$13.500",
            "thumbnail": "https://cdn.shopify.com/s/files/1/0606/6529/9176/products/TKL-2_79565deb-364f-4b52-a3c2-22e34d19aeed_800x.jpg?v=1653779226",
            "id": 1
    	},
    	{
    		"title": "Redragon Lamia 2 RGB Blanco",
            "price": "$7.800",
            "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdA2DDK4Z0ZgLuM387x2rqnB97LUyFLtpmbQHQAqyXJdpOFiGSQU1RKyopY9dOi9h7heA&usqp=CAU",
            "id": 2
    	},
    	{
    		"title": "Redragon Magic Wand K587",
            "price": "$11.000",
            "thumbnail": "https://i.ytimg.com/vi/SME6NCVQhD0/maxresdefault.jpg",
            "id": 2
    	}
    ]
