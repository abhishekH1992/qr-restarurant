import MenuAddons from "../models/menuAddons.model.js";

const menuAddonsResolver = {
    Query: {
        menuAddonById: async(_, {menuAddonId}) => {
            try {
                const data = await MenuAddons.findById(menuAddonId);
                return data;
            } catch(err) {
                console.log('Error in fetching MenuAddons by id', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
    },
    Mutation: {
        storeMenuAddons: async(_, {input}) => {
            try {
                const data = new MenuAddons({
                    ...input
                });
                const addons = await data.save();
                return addons;
            } catch(err) {
                console.log('Error in storing MenuAddons by id', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
        updateMenuAddons: async(_, {input}) => {
            try {
                const data = await MenuAddons.findByIdAndUpdate(input._id, input, {
                    new: true
                });
                return data;
            } catch(err) {
                console.log('Error in storing MenuAddons by id', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
        deleteMenuAddons: async(_, {menuAddonsId}) => {
            try {
                const data = await MenuAddons.findByIdAndDelete(menuAddonsId);
                return data;
            } catch(err) {
                console.log('Error in storing MenuAddons by id', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
    }
}

export default menuAddonsResolver;