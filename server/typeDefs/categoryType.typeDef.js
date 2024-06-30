const categoryTypeTypeDef = `#graphql
    type CategoryType {
        name: String!
        isBidable: Boolean
    }
    type Query {
        categoryType: [CategoryType!]
    }
`;

export default categoryTypeTypeDef;