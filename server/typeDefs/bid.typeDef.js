const bidTypeDef = `#graphql
    type Mutation {
        initialMessage(menuName: String!): String!
        checkBid(input: PlacedBid!): PlaceBidResult!
    }
    input PlacedBid {
        bid: Float!
        attempt: Int!
        _id: ID!
    }
    type PlaceBidResult {
        response: Boolean!
        msg: String!
        counterOffer: Float
        acceptedPrice: Float
    }
`;

export default bidTypeDef;