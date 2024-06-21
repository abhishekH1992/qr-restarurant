const categoryTypeDef = `#graphql
    type Category {
        _id: ID!
        name: String!
        slug: String!
        isEnable: Boolean!
        categoryType: ID!
        image: String!
        subCategory: [SubCategory!]
    }
    type Query {
        category(isEnable: Boolean): [Category!]
        categoryById(categoryId: ID!): Category!
        categoryBySlug(slug: String!): Category!
    }
    type Mutation {
        storeCategory(input: CategoryInput!): Category!
        updateCategory(input: UpdateCategoryInput!): Category!
        deleteCategory(categoryId: ID!): Category!
    }
    input CategoryInput {
        name: String!
        slug: String!
        isEnable: Boolean!
        image: String!
        categoryType: ID!
    }
    input UpdateCategoryInput {
        _id: ID!
        name: String
        slug: String
        isEnable: Boolean
        image: String
        categoryType: ID
    }
`;

export default categoryTypeDef;