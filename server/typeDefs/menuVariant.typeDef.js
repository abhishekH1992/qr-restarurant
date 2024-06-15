const menuVariantTypeDef = `#graphql
    type MenuVariant {
        _id: ID!
        name: String!
        price: Float!
        menu: ID!
    }
    type Query {
        menuVariantById(menuVariantId: ID!): MenuVariant
    }
    type Mutation {
        storeMenuVariant(input: MenuVariantInput!): MenuVariant!
        updateMenuVariant(input: UpdateMenuVariantInput!): MenuVariant!
        deleteMenuVariant(menuVariantId: ID!): MenuVariant!
    }
    input MenuVariantInput {
        name: String!
        price: Float!
        menu: ID!
    }
    input UpdateMenuVariantInput {
        _id: ID!
        name: String!
        price: Float!
        menu: ID!
    }
`;

export default menuVariantTypeDef;