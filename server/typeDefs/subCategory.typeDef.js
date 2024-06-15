const subCategoryTypeDef = `#graphql
    type SubCategory {
        _id: ID!
        name: String!
        image: String!
        isEnable: Boolean!
        category: ID!
        menu: [Menu!]
    }
    type Query {
        subCategory: [SubCategory!]
    }
    type Mutation {
        storeSubCategory(input: SubCategoryInput!): SubCategory!
        updateSubCategory(input: UpdateSubCategoryInput!): SubCategory!
        deleteSubCategory(subCategoryId: ID!): SubCategory!
    }
    input SubCategoryInput {
        name: String!
        image: String!
        isEnable: Boolean!
        category: ID!
    }
    input UpdateSubCategoryInput {
        _id: ID!
        name: String!
        image: String!
        isEnable: Boolean!
        category: ID!
    }
`;

export default subCategoryTypeDef;