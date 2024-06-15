const categoryTypeTypeDef = `#graphql
    type Type {
        name: String!
    }
    type Query {
        categoryType: [Type!]
    }
`;

export default categoryTypeTypeDef;