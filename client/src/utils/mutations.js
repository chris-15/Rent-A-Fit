import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      rentalDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
mutation AddProduct($description: String!, $image: String!, $price: Float!, $name: String!) {
  addProduct(description: $description, image: $image, price: $price, name: $name) {
    name
    image
    description
    username
  }
}`

export const ADD_PHOTO = gql`
  mutation UploadPhoto($photo: String) {
    uploadPhoto(photo: $photo)
  }
`

export const ADD_REVIEW = gql ` 
mutation AddReview($productId: ID!, $reviewBody: String!) {
  addReview(productId: $productId, reviewBody: $reviewBody) {
    reviews {
      reviewBody
      createdAt
      _id
    }
    username
    name
  }
}
`

export const ADD_USER = gql`
 mutation addUser($username: String!, $email: String!, $password: String!){
  addUser(username: $username, email: $email, password: $password){
    token
    user{
      _id
      username
    }
  }
 }
`;
