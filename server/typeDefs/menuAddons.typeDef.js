const menuAddonsTypeDef = `#graphql
    type MenuAddons {
        _id: ID!
        name: String!
        price: Float!
        menu: ID!
    }
    type Query {
        menuAddonById(menuAddonId: ID!): MenuAddons
    }
    type Mutation {
        storeMenuAddons(input: MenuAddonsInput): MenuAddons!
        updateMenuAddons(input: UpdateMenuAddonsInput): MenuAddons!
        deleteMenuAddons(menuAddonsId: ID!): MenuAddons!
    }
    input MenuAddonsInput {
        name: String!
        price: Float!
        menu: ID!
    }
    input UpdateMenuAddonsInput {
        _id: ID!
        name: String!
        price: Float!
        menu: ID!
    }
`;

export default menuAddonsTypeDef;