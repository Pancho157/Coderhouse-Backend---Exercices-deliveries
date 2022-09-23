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

(Las estructuras de las colecciones se basan en la estructura de los datos de la entrega final, la diferencia con la entrega de MariaDB es que la del proyecto final incluye un código para el producto y la fecha de creación del mismo)

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

---

Agregar 10 documentos con valores distintos a las colecciones mensajes y productos. El formato de los documentos debe estar en correspondencia con el que venimos utilizando en el entregable con base de datos MariaDB

---

Al guardar las fechas utilicé el código de debajo (comprobé que funciona)

new Date().toLocaleDateString() + " " + new Date().toTimeString().split(" ")
Como se guarda => '21/9/2022 09:04:39,GMT-0300,(hora,estándar,de,Argentina)'

Inserción de un solo producto:

    db.products.insertOne(
        {_id: 1, timestamp: new Date().toLocaleDateString() + " " + new Date().toTimeString().split(" "), title: "", description: "", code: "20", thumbnail: "", price: 3, stock: 9}
    )

Inserción de varios productos:

    db.products.insertMany([
        {_id: 8, timestamp: new Date().toLocaleDateString() + " " + new Date().toTimeString().split(" "), title: "", description: "", code: "20", thumbnail: "", price: 3, stock: 9},
        {_id: 9, timestamp: new Date().toLocaleDateString() + " " + new Date().toTimeString().split(" "), title: "", description: "", code: "20", thumbnail: "", price: 3, stock: 9}
    ])

Inserción de un mensaje:

    db.messages.insertOne(
        {_id: 1, timestamp: new Date().toLocaleDateString() + " " + new Date().toTimeString().split(" "), email: "mailDePrueba@gmail.com", message: "Este es un mensaje de prueba"}
    )

Inserción de varios mensajes

    db.messages.insertMany([

        {_id: 2, timestamp: new Date().toLocaleDateString() + " " + new Date().toTimeString().split(" "), email: "mailDePrueba@gmail.com", message: "Segundo mensaje de prueba"},

        {{_id: 3, timestamp: new Date().toLocaleDateString() + " " + new Date().toTimeString().split(" "), email: "mailDePrueba@gmail.com", message: "Tercer mensaje de prueba"}}

    ])

---

Definir las claves de los documentos en relación a los campos de las tablas de esa base. En el caso de los productos, poner valores al campo precio entre los 100 y 5000 pesos (eligiendo valores intermedios, ej 120, 580, 900, 1280, 2300, 2860, 3350, 4320, 4990)

---

Las claves de los documentos fueron definidas con la propiedad "\_id"

Para los precios hice una request especial, a modo de que asigne valores random (entre 100 y 5000) a todos los documentos:

(Se que podría simplemente deinirlo a la hora de agregar el documento a la colección o modificando cada documento por separado)

    db.products.aggregate([
    { $set: { price: { $multiply: [{ $rand: {} }, 4900] } } },
    { $set: { price: { $floor: "$price" } } },
    { $set: { price: { $sum: ["$price", 100] } } },
    { $merge: "products" },
    ]);

Básicamente es la fórmula => "price": Math.floor(Math.random()\*(max - min) + min)

---

Listar todos los documentos en cada colección

---

    show collections

Devuelve el listado de colecciones de la BBDD en la que nos encontramos trabajando

    db.collectionName.find()

Devuelve todos los documentos que se encuentren dentro de la colección

---

Mostrar la cantidad de documentos almacenados en cada una de ellas

---

    db.collectionName.countDocuments()

Devuelve la cantidad de documentos (En núemro) que se encuentran en la colección

---

Realizr un CRUD sobre la colección de productos

    a - Agregar un producto más en la colección de productos

    b - Realizar una consulta por nombre de producto específico:

         i - Listar los productos con precio menor a 1000 pesos.

         ii - Listar los productos con precio entre los 1000 a 3000 pesos.

         iii - Listar los productos con precio mayor a 3000 pesos.

         iv - Reealizar una consulta que traiga sólo el nombre del tercer producto más barato.

    c - Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100

    d - Cambir el stock a cero de los productos con precios mayores a 4000 pesos.

    e - Borrar los productos con precio menos a 1000 pesos

---

---

Crear un usuario 'pepe' clave 'asd456' que sólo pueda leer la base de datos ecommerce. Verificar que pepe no pueda cambiar la información

---
