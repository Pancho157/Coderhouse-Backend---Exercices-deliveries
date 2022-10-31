# PROGRAMACION BACKEND

# Comisión #32095

# Desafio 12

## Consigna:

---

1. Sobre el proyecto del último desafío entregable, mover todas las claves y credenciales utilizadas a un archivo **.env**, y cargarlo mediante la librería **dotenv**.

2. La única configuración que no va a ser manejada con esta librería va a ser el puerto de escucha del servidor. Este deberá ser leído de los argumentos pasados por línea de comandos, usando alguna librería (minimist o yargs). En el caso de no pasar este parámetro por línea de comandos, conectar por defecto al puerto 8080.

3. Agregar una ruta '/info' que presente en una vista sencilla los siguientes datos:

   - Argumentos de entrada
   - Nombre de la plataforma (sistema operativo)
   - Versión de node.js
   - Memoria total reservada (rss)
   - Path de ejecución
   - Process id
   - Carpeta del proyecto

4. Agregar otra ruta 'api/randoms' que permita calcular una cantidad de número aleatorios en el rando del 1 a 1000 especificada por parámetros de consulta (query)

   Si dicho parámetro no se ingresa, calcular 100.000.000 de números.
   El dato devuelto al frontend será un objeto que contendrá como claves los números random generados junto a la cantidad de veces que salió cada uno. Esta ruta no será bloqueante (utilizar el método fork de child process). Comprobar el no bloqueo con una cantidad de 500.000.000 de randoms.

### Observaciones:

---

1. Por el momento se puede dejar la elección de sesión y persistencia explicada en el código mismo. Más adelante haremos también parametrizable esta configuración

2. Utilizar routers y apis separadas para esta funcionalidad

### Método de entrega:

---

Link a un repositorio en Github con el proyecto cargado

No inluir los node_modules
