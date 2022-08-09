import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type info {
    id: String,
    title: String,
  }

  type Query {
    info: [info]!
  }
`