const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    username: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
    reviews: [Review]
  }

  type Order {
    _id: ID
    rentalDate: String
    products: [Product]
  }

  type User {
    _id: ID
   username: String
    products: [Product]
    email: String
    orders: [Order]
  }

  type Review {
    _id: ID
    reviewBody: String
    createdAt: String
    username: String
  }

  type Auth {
    token: ID
    user: User
  }

  input ProductInputFilter{
    description: String
    name: String
    image: String
  }
  type Query {
    categories: [Category]
    products(category: ID, username: String): [Product]
    product(_id: ID!): Product
    user(username: String!): User
    users: [User]
    me: User
        # search
        findProduct(input: ProductInputFilter): [Product]
    order(_id: ID!): Order
  }

 

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    addReview(productId: ID!, reviewBody: String!): Product
    login(email: String!, password: String!): Auth
    #our mutation type for image upload which accepts the image location as a string whether local or remote.It returns a string.
    uploadPhoto(photo: String): String
    addProduct(description: String!, image: String!, price: Float!, name: String!): Product

   
  }
`;

module.exports = typeDefs;

// mutation needed for addProduct! go back 