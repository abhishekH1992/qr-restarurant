import CategoryType from "../models/categoryType.model.js";
import Category from "../models/category.model.js";
import SubCategory from "../models/subCategory.model.js";

const categoryResolver = {
    Query: {
        category: async(_, {isEnable}) => {
            try {
                if(isEnable) {
                    const data = await Category.find({ isEnable: isEnable });
                    return data;
                } else {
                    const data = await Category.find();
                    return data;
                }
            } catch(err) {
                console.log('Error in fetching categories', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
        categoryById: async(_, {categoryId}) => {
            try {
                const data = await Category.findById(categoryId);
                return data;
            } catch(err) {
                console.log('Error in fetching category by id', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
        categoryBySlug: async(_, {slug}) => {
            try {
                const data = await Category.find({ slug: slug });
                return data;
            } catch(err) {
                console.log('Error in fetching category by slug', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
    },
    Mutation: {
        storeCategory: async(_, {input}) => {
            try {
                const data = new Category({
                    ...input
                })
                const category = await data.save();
                return category;
            } catch(err) {
                console.log('Error in storing category', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
        updateCategory: async(_, {input}) => {
            try {
                const category = await Category.findByIdAndUpdate(input._id, input, {
                    new: true
                });
                return category;
            } catch(err) {
                console.log('Error in updating category', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
        deleteCategory: async(_, {categoryId}) => {
            try {
                const category = await Category.findByIdAndDelete(categoryId);
                return category;
            } catch(err) {
                console.log('Error in updating category', err);
                throw new Error(err.message || 'Internal Server error');
            }
        }
    },
    Category: {
        subCategory: async (parent) => {
            try {
                const data = await SubCategory.find({ category: parent._id });
                return data;
            } catch (err) {
                console.log("Error in category.subcategory resolver: ", err);
                throw new Error(err.message || "Internal server error");
            }
        },
        categoryType: async(parent) => {
            try {
                return await CategoryType.findById(parent.categoryType);
            } catch (err) {
                console.log("Error in category.categoryType resolver: ", err);
                throw new Error(err.message || "Internal server error");
            }
        }
    }
}

export default categoryResolver;