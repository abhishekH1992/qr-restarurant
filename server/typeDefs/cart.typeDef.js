const cartTypeDef = `#graphql
    type Cart {
        _id: ID!
        tableId: ID
        note: String
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
        getCart(cartId: ID!): Cart
    }
    type Mutation {
        createCart(input: CartInput): Cart!
        cartItem(input: CartItemInput!): CartItem!
        cartItemAddOn(input: CartItemAddOnInput!): [CartItemAddOn!]!
        updateCart(input: CartItemUpdateInput!): CartItem!
        deleteCartItem(cartItemId: ID!): CartItem!
        updateCartDetails(input: CartDetails!): Cart!
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
    input CartDetails {
        _id: ID!
        tableId: ID
        note: String
    }
`;

export default cartTypeDef;