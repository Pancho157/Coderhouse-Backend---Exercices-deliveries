# PROGRAMACION BACKEND

# Comisión #32095

# Desafio 14 (Loggers & GZIP)

---

# Indice

---

1. [Compresión](#compresión)

2. [Logger](#logger)

3. [Artillery](#artillery)

4. [Autocannon](#autocannon)

5. [Inspect](#inspect)

6. [0x](#0x)

7. [Conclusión](#conclusión)

---

## Compresión

---

Peso del archivo "/info" CON compresión:

![image](./assets/info-con-comp.png)

Peso del archivo "/info" SIN compresión:

![image](./assets/info-sin-comp.png)

---

## Logger

---

Se utilizó Log4js como logger y su configuración se encuentra dentro de la carpeta llamada "loggers"

Para utilizar los logs se deberá establecer una variable llamada "ENV" utilizando dotenv

    process.env.ENV == undefined

        - Los logs se ejecutarían de manera default (solo se mostrarían las salídas info o superiores y solo por consola)

                        -------------------

    process.env.ENV == "prod"

        - Las salidas tipo "error" o "warning" se guardarán en diferentes archivos, dentro de una carpeta llamada "logs"
        - Las salidas tipo info se mostrarán por consola

                        -------------------

    process.env.ENV == "dev"

        - Todas las salidas se mostrarán por consola (incluidas las tipo "trace" y "debug")

---

## Artillery

---

    Comandos utilizados para ejecutar el servidor con el profiler de Node.js:
    node --prof index.js
            (ejecutar el servidor con el console.log y sin el console.log)

    node --prof-process fork-console.log > result_fork-console.txt
    node --prof-process fork-noConsole.log > result_fork-noConsole.txt
            (los resultados se dejan almacenados en la carpeta "documentation")

    Comando utilizado en Artillery
    artillery quick --count 50 -n 20 http://localhost:8080/info > result.txt

---

           Servidor modo FORK - Comparación con Artillery

- Ruta /info sin console.log

![image](./assets/fork-artillery-noConsole.png)

- Ruta /info con console.log

![image](./assets/fork-artillery-console.png)

            Servidor modo FORK - Comparación del Profiler de Node-js

- Ruta /info sin console.log

![image](./assets/fork-prof-noConsole.png)

- Ruta /info con console.log

![image](./assets/fork-prof-console.png)

---

## Autocannon

---

Resultados del test utilizando autocannon:

- Ruta "/info" SIN console.log:

  ![image](./assets/autocannon-noConsole.png)

- Ruta "/info" CON console.log:

  ![image](./assets/autocannon-console.png)

- Para ejecutarlo, se deberá inicir el servidor ("npm start") y en otra consola utilizar el siguiente comando:

  npm test

---

## Inspect

---

- Se deberá ejecutar el servidor como inspect:

  node --inspect index.js

- Luego se deberá acceder al modo inspect de chrome (URL = "chrome://inspect")

- El siguiente paso sería comenzar a grabar con el profiler de Chrome

- Después se deberá hacer un test de carga con Artillery (artillery quick --count 50 -n 20 http://localhost:8080/info > result.txt) y se deberá dejar de grabar con el profiler

- Finalmente se procede a mirar los resultados que trae el profiler

Observación:

- Es más sencillo entender lo que dice el profiler cuando se va a la seccción "Sources" y se mira por archivo (es lo que se muestra en las imagenes ubicadas debajo)

Resultados:

- Inspect de la ruta "/info" SIN console.log:

    ![image](./assets/inspect-noConsole.png)

- Inspect de la ruta "/info" CON console.log:

    ![image](./assets/inspect-console.png)



---

## 0x

---

---

## Conclusión

---
