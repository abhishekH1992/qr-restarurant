const menuTypeDef = `#graphql
    type Menu {
        _id: ID!
        name: String!
        description: String
        image: String
        fixedPrice: Float!
        lowestPrice: Float
        highestPrice: Float
        step: Float
        currentPrice: Float
        isEnable: Boolean
        subCategory: ID!
        menuAddOns: [MenuAddons!]
        menuVariant: [MenuVariant!]
    }
    type Query {
        menu: [Menu!]
        menuById(menuId: ID!): Menu
    }
    type Mutation {
        storeMenu(input: MenuInput): Menu!
        updateMenu(input: UpdateMenuInput): Menu!
        deleteMenu(menuId: ID!):Menu!
    }
    input MenuInput {
        name: String!
        description: String
        image: String
        fixedPrice: Float!
        lowestPrice: Float
        highestPrice: Float
        step: Float
        currentPrice: Float
        isEnable: Boolean
        subCategory: ID!
    }
    input UpdateMenuInput {
        _id: ID!
        name: String!
        description: String
        image: String
        fixedPrice: Float!
        lowestPrice: Float
        highestPrice: Float
        step: Float
        currentPrice: Float
        isEnable: Boolean
        subCategory: ID!
    }
`;

export default menuTypeDef;