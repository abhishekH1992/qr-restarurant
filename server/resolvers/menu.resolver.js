import Menu from "../models/menu.model.js";
import MenuAddons from "../models/menuAddOns.model.js";
import MenuVariant from "../models/menuVariant.model.js";

const menuResolver = {
    Query: {
        menu: async() => {
            try {
                const data = await Menu.find();
                return data;
            } catch(err) {
                console.log('Error in fetching Menu', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
        menuById: async(_, {menuId}) => {
            try {
                const data = await Menu.findById(menuId);
                return data;
            } catch(err) {
                console.log('Error in fetching Menu by id', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
    },
    Mutation: {
        storeMenu: async(_, {input}) => {
            try {
                const data = new Menu({
                    ...input
                });
                const menu = await data.save();
                return data;
            } catch(err) {
                console.log('Error in storing Menu', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
        updateMenu: async(_, {input}) => {
            try {
                const data = await Menu.findByIdAndUpdate(input._id, input, {
                    new: true
                });
                return data;
            } catch(err) {
                console.log('Error in updating Menu', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
        deleteMenu: async(_, {menuId}) => {
            try {
                const data = await Menu.findByIdAndDelete(menuId);
                return data;
            } catch(err) {
                console.log('Error in deleting Menu', err);
                throw new Error(err.message || 'Internal Server error');
            }
        }
    },
    Menu: {
        menuAddOns: async(parent) => {
            try {
                const data = await MenuAddons.find({ menu: parent._id });
                return data;
            } catch(err) {
                console.log('Error in fetching Menu.addons', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
        menuVariant: async(parent) => {
            try {
                const data = await MenuVariant.find({ menu: parent._id });
                return data;
            } catch(err) {
                console.log('Error in fetching Menu.variant', err);
                throw new Error(err.message || 'Internal Server error');
            }
        }
    }
}

export default menuResolver;