# PROGRAMACION BACKEND

# Comisión #32095

# Desafio 14 (Loggers & GZIP)

---

# Indice

---

1. [Compresión](#compresión)

2. [Logger](#logger)

3. [Artillery](#artillery)

4. [0x](#0x)

5. [Conclusión](#conclusión)

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

Se utilizó Log4js como logger

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

Observación:

- La configuración de log4js se encuentra dentro de la carpeta llamada "loggers"