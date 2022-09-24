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
                        description: "_id is required and must be created with ObjectId().toString()",
                    },
                    timestamp: {
                        bsonType: "string",
                        description: "Timestamp must be a string and is required",
                    },
                    title: {
                        bsonType: "string",
                        description: "Title must be a string and is required",
                    },
                    description: {
                        bsonType: "string",
                        description: "Must be a stri ng",
                    },
                    code: {
                        description: "Code is required and is a string",
                    },
                    thumbnail: {
                        bsonType: "string",
                        description: "Thumbnail must be a string and is required",
                    },
                    price: {
                        description: "Price must be a interger (between 100 and 5000) and is required",
                    },
                    stock: {
                        bsonType: "int",
                        description: "Stock must be a interger and is required",
                    },
                },
            },
        },
    });

---

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
                        bsonType: "string",
                        description: "Must be ObjectId()",
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
        }
    });

---

Agregar 10 documentos con valores distintos a las colecciones mensajes y productos. El formato de los documentos debe estar en correspondencia con el que venimos utilizando en el entregable con base de datos MariaDB

---

Al guardar las fechas utilicé el código de debajo (comprobé que funciona)

new Date().toLocaleDateString() + " " + new Date().toTimeString().split(" ")
Como se guarda => '21/9/2022 09:04:39,GMT-0300,(hora,estándar,de,Argentina)'

Inserción de un solo producto:

    db.products.insertOne({
        _id: ObjectId().toString(),
        timestamp: new Date().toLocaleDateString() + " " + new Date().toTimeString().split(" "),
        title: "Título de prueba",
        description: "Descripción del producto de prueba",
        code: "CodeN01",
        thumbnail: "URL de la foto/imagen",
        price: 600,
        stock: 4,
    })

Inserción de varios productos:

    db.products.insertMany([
        {
            _id: ObjectId().toString(),
            timestamp: new Date().toLocaleDateString() + " " + new Date().toTimeString().split(" "),
            title: "Otro producto de prueba",
            description: "Alguna descripción random para matar tiempo jeje",
            code: "20",
            thumbnail: "URL de la foto/imagen",
            price: 700,
            stock: 9,
        },{
            _id: ObjectId().toString(),
            timestamp: new Date().toLocaleDateString() + " " + new Date().toTimeString().split(" "),
            title: "Un producto directo de china",
            description: "Otra descripción random. Por qué? No hay porque",
            code: "20",
            thumbnail: "URL de la foto/imagen",
            price: 400,
            stock: 9,
        },{
            _id: ObjectId().toString(),
            timestamp: new Date().toLocaleDateString() + " " + new Date().toTimeString().split(" "),
            title: "Por qué no otro meme?",
            description: "Jeje",
            code: "20",
            thumbnail: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.rtve.es%2Fnoticias%2F20210516%2Fhistoria-disaster-girl-meme-medio-millon-dolares%2F2090101.shtml&psig=AOvVaw2beuyMd7d0m66X6wVnj_ns&ust=1664112658187000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCICxzYzFrfoCFQAAAAAdAAAAABAD",
            price: 400,
            stock: 9,
        }
    ])

Inserción de un mensaje:

    db.messages.insertOne({
        _id: ObjectId().toString(),
        timestamp: new Date().toLocaleDateString() + " " + new Date().toTimeString().split(" "),
        email: "mailDePrueba@gmail.com",
        message: "Este es un mensaje de prueba"
    })

Inserción de varios mensajes

    db.messages.insertMany([
        {
            _id: ObjectId().toString(),
            timestamp: new Date().toLocaleDateString() + " " + new Date().toTimeString().split(" "),
            email: "mailDePrueba@gmail.com",
            message: "Segundo mensaje de prueba"
        },{
            _id: ObjectId().toString(),
            timestamp: new Date().toLocaleDateString() + " " + new Date().toTimeString().split(" "),
            email: "mailDePrueba@gmail.com",
            message: "Tercer mensaje de prueba"
        }

    ])

---

Definir las claves de los documentos en relación a los campos de las tablas de esa base. En el caso de los productos, poner valores al campo precio entre los 100 y 5000 pesos (eligiendo valores intermedios, ej 120, 580, 900, 1280, 2300, 2860, 3350, 4320, 4990)

---

Las claves de los documentos fueron definidas con la propiedad "\_id"

Para los precios hice una request especial, a modo de que asigne valores random (entre 100 y 5000) a todos los documentos:

(Se que podría simplemente deinirlo a la hora de agregar el documento a la colección o modificando cada documento por separado)

    db.products.aggregate([
        { $set: { price: { $multiply: [{ $rand: {} }, 4900] } } },
        { $set: { price: { $sum: ["$price", 100] } } },
        { $set: { price: { $floor: "$price" } } },
        { $merge: {into: "products"} }
    ]);

Básicamente es la fórmula => "price": Math.floor(Math.random()\*(max - min) + min)

(No es posible colocar el precio como int de manera obligatoria, ya que el algoritmo no funcionaría)

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

    var col_list= db.yourCollection.findOne();
    for (var col in col_list) { print (col) ; }

Este script devuelve como está construido nuestro documento, es decir, cada una de sus propiedades

(Si bien no se pidió me parece un buen dato)

---

Realizr un CRUD sobre la colección de productos

    a - Agregar un producto más en la colección de productos

    b - Realizar una consulta por nombre de producto específico:

         i - Listar los productos con precio menor a 1000 pesos.

         ii - Listar los productos con precio entre los 1000 a 3000 pesos.

         iii - Listar los productos con precio mayor a 3000 pesos.

         iv - Reealizar una consulta que traiga sólo el nombre del tercer producto más barato.

    c - Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100

    d - Cambiar el stock a cero de los productos con precios mayores a 4000 pesos.

    e - Borrar los productos con precio menos a 1000 pesos

---

a - Agregar un producto

    db.products.insertOne({
        _id: ObjectId().toString(),
        timestamp: new Date().toLocaleDateString() + " " + new Date().toTimeString().split(" "),
        title: "Título de prueba",
        description: "Descripción del producto de prueba",
        code: "CodeN01",
        thumbnail: "URL de la foto/imagen",
        price: 600,
        stock: 4,
    })

b - Encontrar un producto específico por su nombre

    db.products.find({title: "Un producto directo de china"})

i - Listar los productos menores a $1000

    db.products.find({price: { $lt: 1000 }})

ii - Listar los productos con precio entre los $1000 a $3000

    db.products.find({price: { $gt: 1000, $lt: 3000 }})

iii - Listar los productos con precio mayor a $3000

    db.products.find({price: { $gt: 3000 }})

iv - Reealizar una consulta que traiga sólo el nombre del tercer producto más barato

    var sortedArray = db.products.find().sort({price: 1}).toArray();
    sortedArray[2]

    o

    db.products.find().sort({price: 1}).toArray()[2]

c - Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100

    db.products.updateMany({},
    {
        $set: {"stock": 100}
    })

d - Cambiar el stock a cero de los productos con precios mayores a 4000 pesos

    db.products.updateMany({ price: {$gt: 4000 }},
    {
        $set: {"stock": 0}
    })

e- Borrar los productos con precio menos a $1000

    db.products.deleteMany({price: { $lt: 1000 }})

---

Crear un usuario 'pepe' clave 'asd456' que sólo pueda leer la base de datos ecommerce. Verificar que pepe no pueda cambiar la información

---
