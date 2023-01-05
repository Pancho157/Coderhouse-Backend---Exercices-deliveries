# PROGRAMACIÓN BACKEND

# Comisión #32095

# 3er entrega del Proyecto Final

## Requisitos del proyecto:

---

1.  Tener instalado Node.js en la PC a ejecutar el proyecto

2.  Tener una cuenta de nodemailer y twilio (como Twilio CLI, no test)

3.  Configurar un archivo [.env](./env_file_template.md) con las siguientes variables :

        ENV = "prod" ó "dev"
        PERS = "mongodb" ó "firebase" (BBDD para el chat)

        ADMIN_EMAIL = (Email al cual enviar correos de registro de usuario y pedidos de compra)
        ADMIN_PHONE = (N° de teléfono al cual enviar mensajes de registro de usuario y pedidos de compra - debe incluír el prefijo. Ejemplo: +5493764111111)

        NODEMAILER_EMAIL = (Cuenta de gmail con verif de dos pasos y contraseña para aplicaciones)
        NODEMAILER_PASS = (contraseña para aplicaciones de la cuenta de gmail)

        TWILIO_SID = (SID de twilio)
        TWILIO_TOKEN = (Token de twilio)
        TWILIO_NUMBER = (Número de teléfono de twilio para enviar los mensajes)

        MONGO_URL = (mongoDB Atlas connection url)

            (como JSON.Stringify dentro de la variable)
        FIREBASE_CONFIG = {
          type: (Dado por firebase),
          project_id: (Dado por firebase),
          private_key_id: (Dado por firebase),
          private_key: (Dado por firebase),
          client_email: (Dado por firebase),
          client_id: (Dado por firebase),
          auth_uri: (Dado por firebase),
          token_uri: (Dado por firebase),
          auth_provider_x509_cert_url: (Dado por firebase),
          client_x509_cert_url: (Dado por firebase)
        }

4.  Instalar las dependencias del proyecto:

        "dependencies": {
          "autocannon": "^7.10.0",
          "child_process": "^1.0.2",
          "cluster": "^0.7.7",
          "compression": "^1.7.4",
          "connect-mongo": "^4.6.0",
          "dotenv": "^16.0.3",
          "express": "^4.18.2",
          "express-handlebars": "^6.0.6",
          "express-session": "^1.17.3",
          "express-socket.io-session": "^1.3.5",
          "firebase": "^9.14.0",
          "firebase-admin": "^11.3.0",
          "log4js": "^6.7.0",
          "md5": "^2.3.0",
          "mongodb": "^4.12.1",
          "mongoose": "^6.7.3",
          "multer": "^1.4.5-lts.1",
          "nodemailer": "^6.8.0",
          "nodemon": "^2.0.20",
          "passport": "^0.6.0",
          "passport-local": "^1.0.0",
          "path": "^0.12.7",
          "socket.io": "^4.5.4",
          "twilio": "^3.84.0",
          "util": "^0.12.5",
          "yargs": "^17.6.2"
        }

## Como instalar el proyecto:

---

1.  Configurar las variables de entorno

2.  Instalar las dependencias del proyecto

        yarn install

3.  Iniciar el servidor

        FORK: yarn start

        CLUSTER: yarn start (con variable de ambiente "CLUSTER = 'true'")
