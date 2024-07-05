const orderTypeDef = `#graphql
    type Mutation {
        createPaymentIntent(amount: Float!): PaymentIntentResponse
        placeOrder(cartId: ID!): Order!
    }
    type Query {
        getOrderById(id: ID!): Order!
        getOrdersByIds(ids: [ID!]!): [Order!]
    }
    type PaymentIntentResponse {
        clientSecret: String
    }
    type Order {
        _id: ID!
        tableId: ID!
        note: String
        orderNumber: String!
        items: [OrderItems!]!
    }
    type OrderItems {
        _id: ID!
        orderId: ID!
        menuId: ID!
        quantity: Int!
        variantId: ID
        salePrice: Float!
        menu: Menu!
        variant: MenuVariant
        addon: [MenuAddons]!
    }
`;

export default orderTypeDef;