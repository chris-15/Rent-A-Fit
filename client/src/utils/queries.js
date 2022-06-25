import { gql } from "@apollo/client";

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;


export const QUERY_PRODUCTS_WITH_REVIEWS = gql `
query Products {
  products {
    _id
    name
    username
    description
    image
    quantity
    price
    category {
      _id
      name
    }
    reviews {
      reviewBody
      _id
      createdAt
      username
    }
  }
}
`
export const QUERY_ALL_PRODUCTS = gql`
  {
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
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        rentalDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;
