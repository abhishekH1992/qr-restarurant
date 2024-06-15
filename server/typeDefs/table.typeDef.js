const tableTypeDef = `#graphql
    type Table {
        _id: ID!
        name: String!
    }
    type Query {
        table: [Table!]
    }
    type Mutation {
        storeTable(input: TableInput!): Table!
        updateTable(input: TableUpdateInput!): Table!
        deleteTable(id: ID!): Table!
    }
    input TableInput {
        name: String!
    }
    input TableUpdateInput {
        _id: ID!
        name: String!
    }
`;

export default tableTypeDef;