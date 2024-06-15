import CategoryType from "../models/categoryType.model.js";

const categoryTypeResolver = {
    Query: {
        categoryType: async() => {
            try {
                const type = await CategoryType.find();
                return type;
            } catch(err) {
                console.log('Error in fetching Site', err);
                throw new Error(err.message || 'Internal Server error');
            }
        }
    },
}

export default categoryTypeResolver;