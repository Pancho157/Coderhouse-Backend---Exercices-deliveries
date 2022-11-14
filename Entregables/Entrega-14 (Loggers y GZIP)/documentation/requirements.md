# PROGRAMACION BACKEND

# Comisión #32095

# Desafio 14

## Consigna:

---

1. Incorporar al proyecto de servidor de trabajo la compresión gzip.

Verificar sobre la ruta '/info' con y sin compresión, la diferencia de cantidad de bytes devueltos en un caso y otro.

Luego inplementas loggeo (con alguna librería vista en clase) que registre lo siguiente:

- Ruta y método de todas las peticiones recibidas por el servidor (info)

- Ruta y método de las peticiones a rutas inexistentes en el servidor (warning)

- Errores lanzados por las apis de mensajes y productos, únicamente (error)

2. Luego, realizar el análisis completo de performance del servidor con el que venimos trabajando.

   - Vamos a trabajar sobre la ruta '/info', en modo fork, agregando o extrayendo un console.log de la información colectada antes de devolverla al cliente. Además desactivaremos el child_process de la ruta '/randoms'

   - Para ambas condiciones (con o sin console.log) en la ruta '/info', obtener:

     1. El perfilamiento del servidor, realizando el test con --prof de node.js. Analizar los resultados obtenidos luego de procesarlos con --prof-process

     Utilizaremos como test de carga Artillery en línea de comandos, emulando 0 conexiones concurrentes con 20 requests por cada una. Extraer un reporte co los resuados en archivo de texto

3. Luego utilizaremos Autocannon en línea de comandos, emulando 100 conexiones concurrentes realizadas en un tiempo de 20 segundos. Extraer un reporte con los resultados (puede ser un print screen de la consola)

4. El perfilamiento del servidor con el mo inspectoor de node.js --inspect. Revisar el tiempo de los procesos menos performantes sobre el archivo fuente de inspector

5. El diagrama de flama con 0x, emulando la carga con Autocannon con los mismos parámetros anteriores.

Realizar un informe en formato pdf sobre las pruebas realizadas incluyendo los resultados de todos los test (texto e imágenes)

- l final incluir la conclusión obtenida a partir del análisis de los datos

### Método de entrega:

---

Link a un repositorio en Github con el proyecto cargado

No inluir los node_modules
