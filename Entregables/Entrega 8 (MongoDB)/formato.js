db.createCollection("testProducts", {
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
          description: "Must be a string",
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
          minimum: 1,
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
