const siteTypeDef = `#graphql
    type Site {
        _id: ID!
        name: String!
        email: String!
        logo: String!
        banner: [String!]
    }
    type Query {
        site: Site
    }
    type Mutation {
        storeSite: Site
    }
`

export default siteTypeDef;