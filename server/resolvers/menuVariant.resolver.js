import MenuVariant from "../models/menuVariant.model.js";

const menuVariantResolver = {
    Query: {
        menuVariantById: async(_, {menuVariantId}) => {
            try {
                const data = await MenuVariant.findById(menuVariantId);
                return data;
            } catch(err) {
                console.log('Error in fetching MenuVariant by id', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
    },
    Mutation: {
        storeMenuVariant: async(_, {input}) => {
            try {
                const data = new MenuVariant({
                    ...input
                });
                const addons = await data.save();
                return addons;
            } catch(err) {
                console.log('Error in storing MenuVariant by id', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
        updateMenuVariant: async(_, {input}) => {
            try {
                const data = await MenuVariant.findByIdAndUpdate(input._id, input, {
                    new: true
                });
                return data;
            } catch(err) {
                console.log('Error in storing MenuVariant by id', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
        deleteMenuVariant: async(_, {menuVariantId}) => {
            try {
                const data = await MenuVariant.findByIdAndDelete(menuVariantId);
                return data;
            } catch(err) {
                console.log('Error in storing MenuVariant by id', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
    }
}

export default menuVariantResolver;