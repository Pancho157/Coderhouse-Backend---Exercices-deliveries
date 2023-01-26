# Consultas graphql

---

## GraphQL products url

---

    http://localhost:8080/api/products/graphql/v1?

---

## Queries

---

    query {
        getProducts {
            _id
            title
            price
            thumbnail
            stock
        }
    }

---

## Mutations

---

    mutation {
        postProduct(data: {
            title: "Producto ingresado con graphQL"
            price: 40
            thumbnail: "https://graphql.org/img/og-image.png"
            stock: 6
        }) {
            response
        }
    }

    mutation {
        updateProduct(id: 3, data: {
            title: "Producto actualizado con graphQL"
            price: 400
            thumbnail: "https://graphql.org/img/og-image.png"
            stock: 7
        }) {
            _id
            title
            price
            thumbnail
            stock
        }
    }

    mutation {
        deleteProduct(id: 3) {
            response
        }
    }
