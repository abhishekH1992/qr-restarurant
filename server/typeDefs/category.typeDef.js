const categoryTypeDef = `#graphql
    type Category {
        _id: ID!
        name: String!
        slug: String!
        isEnable: Boolean!
        categoryType: ID!
        subCategory: [SubCategory!]
    }
    type Query {
        category: [Category!]
        categoryById(categoryId: ID!): Category!
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
        categoryType: ID!
    }
    input UpdateCategoryInput {
        _id: ID!
        name: String!
        slug: String!
        isEnable: Boolean!
        categoryType: ID!
    }
`;

export default categoryTypeDef;