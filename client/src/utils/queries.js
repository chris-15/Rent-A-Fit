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

export const FIND_PRODUCT = gql `
query FindProduct($input: ProductInputFilter) {
  findProduct(input: $input) {
    _id
    name
    image
    description
    username
    price
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

export const QUERY_ME = gql`
query Me {
  me {
    _id
    username
    product {
      _id
      username
      name
      image
      quantity
      description
      price
      
    }
    orders {
      rentalDate
      _id
      products {
        name
        image
        description
        price
      }
    }
  }
}
`
export const QUERY_USER = gql`
  query User($username: String!) {
  user(username: $username) {
    _id
    username
    products {
      username
      name
      _id
      image
      description
      price
      category {
        name
      }
      reviews {
        reviewBody
      }
    }
    email
  }
}
`;
