const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

const {
  getProducts,
  postProduct,
  updateProduct,
  deleteProduct,
} = require("../../3-Controller/api-products-grapthql");

const schema = buildSchema(`
  input ProductInput {
    title: String
    price: Int
    thumbnail: String
    stock: Int
  }
  type Product {
    _id: ID!
    title: String
    price: Int
    thumbnail: String
    stock: Int
  }
  type Response {
    response: String
  }
  type Query {
    getProducts: [Product]
  }
  type Mutation {
    postProduct(data: ProductInput): Response
    updateProduct(id: Int, data: ProductInput): Product
    deleteProduct(id: Int): Response
  }
`);

const graphqlMiddleware = graphqlHTTP({
  schema: schema,
  rootValue: {
    getProducts,
    postProduct,
    updateProduct,
    deleteProduct,
  },
  graphiql: true,
});

module.exports = { graphqlMiddleware };
