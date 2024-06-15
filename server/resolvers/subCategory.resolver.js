import SubCategory from "../models/subCategory.model.js";
import Menu from "../models/menu.model.js";

const subCategoryResolver = {
    Query: {
        subCategory: async() => {
            try {
                const data = await SubCategory.find();
                return data;
            } catch(err) {
                console.log('Error in fetching sub-category', err);
                throw new Error(err.message || 'Internal Server error');
            }
        }
    },
    Mutation: {
        storeSubCategory: async(_, {input}) => {
            try {
                const data = new SubCategory({
                    ...input
                });
                const subCategory = await data.save();
                return subCategory;
            } catch(err) {
                console.log('Error in storing sub-category', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
        updateSubCategory: async(_, {input}) => {
            try {
                const data = await SubCategory.findByIdAndUpdate(input._id, input, {
                    new: true,
                });
                return data;
            } catch(err) {
                console.log('Error in storing sub-category', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
        deleteSubCategory: async(_, {subCategoryId}) => {
            try {
                const data = await SubCategory.findByIdAndDelete(subCategoryId);
                return data;
            } catch(err) {
                console.log('Error in storing sub-category', err);
                throw new Error(err.message || 'Internal Server error');
            }
        }
    },
    SubCategory: {
        menu: async(parent) => {
            try {
                const data = await Menu.find({ subCategory: parent._id });
                return data;
            } catch (err) {
                console.log("Error in subcategory.menu resolver: ", err);
                throw new Error(err.message || "Internal server error");
            }
        }
    }
};

export default subCategoryResolver;