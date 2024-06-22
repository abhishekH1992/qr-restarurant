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
        menu: Menu!
        variant: MenuVariant
        addon: [MenuAddons]!
    }
    type CartItemAddOn {
        cartItemId: ID!
        addOnId: ID!
    }
    type Query {
        getCartItems(cartId: ID!): [CartItem]!
    }
    type Mutation {
        createCart(input: CartInput): Cart!
        cartItem(input: CartItemInput!): CartItem!
        cartItemAddOn(input: CartItemAddOnInput!): [CartItemAddOn!]!
        updateCart(input: CartItemUpdateInput!): CartItem!
        deleteCartItem(cartItemId: ID!): CartItem!
    }
    input CartInput {
        tableId: ID
    }
    input CartItemUpdateInput {
        _id: ID!
        menuId: ID!
        quantity: Int!
        variantId: ID
        salePrice: Float
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