const cartTypeDef = `#graphql
    type Cart {
        _id: ID!
        tableId: ID
    }
    type CartItem {
        _id: ID!
        cartId: ID!
        menuId: ID!
        quantity: Int!
        variantId: ID
        salePrice: Float!
    }
    type CartItemAddOn {
        cartItemId: ID!
        addOnId: ID!
    }
    type Query {
        getCart(CartId: ID!): [CartItem]!
    }
    type Mutation {
        createCart(input: CartInput): Cart!
        updateCart(input: CartUpdateInput): Cart!
        cartItem(input: CartItemInput!): CartItem!
        cartItemAddOn(input: CartItemAddOnInput!): [CartItemAddOn!]!
    }
    input CartInput {
        tableId: ID
    }
    input CartUpdateInput {
        _id: ID!
        tableId: ID
    }
    input CartItemInput {
        cartId: ID!
        menuId: ID!
        quantity: Int!
        variantId: ID
        salePrice: Float
    }
    input CartItemAddOnInput {
        cartItemId: ID!
        addOnId: [ID!]!
    }
`;

export default cartTypeDef;