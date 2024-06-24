const siteTypeDef = `#graphql
    type Site {
        _id: ID!
        restaurant_id: Int!
        name: String!
        email: String!
        logo: String!
        banner: [String!]
        stripePublishKey: String
        stripeSecretKey: String
    }
    type Query {
        site: Site
    }
    type Mutation {
        updateSite(input: TypeInput!): Site!
    }
    input TypeInput {
        restaurant_id: Int!
        name: String!
        email: String!
        logo: String!
        banner: [String!]
    }
`

export default siteTypeDef;