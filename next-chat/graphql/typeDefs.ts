import { gql } from "apollo-server-micro";

export default gql`
  type User {
    username: String!
    email: String!
  }

  type Query {
    hello: String!
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): String!
  }
`;