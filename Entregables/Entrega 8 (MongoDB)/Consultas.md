# PROGRAMACION BACKEND

# Comisión #32095

# Respuestas desafio 8 (para mongo shell)

---

1. Utilizando Mongo Shell, crear una base de datos llamada ecommerce que contenga dos colecciones: mensajes y productos

---

Iniciar el servidor:

    mongod dbpath "path\to\BBDD"

Conectarse al servidor:

    mongosh

Selecciona BBDD (y la genera si no existe):

    use ecommerce

Genera las colecciones con "schemas validation":

(Las estructuras de las colecciones se basan en la estructura de los datos de la entrega final)

    db.createCollection("products", {
    validator: {
        $jsonSchema: {
        bsonType: "object",
        required: [
            "_id",
            "timestamp",
            "title",
            "code",
            "thumbnail",
            "price",
            "stock",
        ],
        properties: {
            _id: {
                bsonType: "int",
                minimum: 1,
                description: "Must be a interger and is required",
            },
            timestamp: {
                bsonType: "string",
                description: "Must be a string and is required",
            },
            title: {
                bsonType: "string",
                description: "Must be a string and is required",
            },
            description: {
                bsonType: "string",
                description: "Must be a stri ng",
            },
            code: {
                bsonType: "string",
                description: "Must be a string and is required",
            },
            thumbnail: {
                bsonType: "string",
                description: "Must be a string and is required",
            },
            price: {
                bsonType: "int",
                minimum: 100,
                maximum: 5000,
                description: "Must be a interger and is required",
            },
            stock: {
                bsonType: "int",
                minimum: 1,
                description: "Must be a interger and is required",
            },
        },
        },
    },
    });

    db.createCollection("messages", {
    validator: {
        $jsonSchema: {
        bsonType: "object",
        required: [
            "_id",
            "timestamp",
            "email",
            "message",
        ],
        properties: {
            _id: {
                bsonType: "int",
                minimum: 1,
                description: "Must be a interger and is required",
            },
            timestamp: {
                bsonType: "string",
                description: "Must be a string and is required",
            },
            email: {
                bsonType: "string",
                description: "Must be a string and is required",
            },
            message: {
                bsonType: "string",
                description: "Must be a string",
            },
        },
        },
    },
    });
