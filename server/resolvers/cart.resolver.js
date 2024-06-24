import Cart from "../models/cart.model.js";
import CartItem from "../models/cartItem.model.js";
import CartItemAddOn from "../models/cartItemAddOn.model.js";
import Menu from "../models/menu.model.js";
import MenuAddons from "../models/menuAddons.model.js";
import MenuVariant from "../models/menuVariant.model.js";

const cartResolver = {
    Mutation: {
        createCart: async(_, {input}) => {
            try {
                const data = new Cart({
                    ...input
                });
                const cart = await data.save();
                return cart;
            } catch(err) {
                console.log('Error in creating cart', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
        updateCart: async(_, {input}) => {
            try {
                const cart = await CartItem.findByIdAndUpdate(input._id, input, {
                    new: true
                });
                return cart;
            } catch(err) {
                console.log('Error in updating cart', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
        cartItem: async(_, {input}) => {
            try {
                const data = new CartItem({
                    ...input
                });
                const item = await data.save();
                return item;
            } catch(err) {
                console.log('Error in adding cart item', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
        cartItemAddOn: async(_, {input}) => {
            try {
                const { cartItemId, addOnId } = input;
                const newItemAddOn = [];
                for (let id of addOnId) {
                    newItemAddOn.push({
                        cartItemId,
                        addOnId: id
                    });
                }
                const createdItems = await CartItemAddOn.insertMany(newItemAddOn);
                return createdItems;
            } catch(err) {
                console.log('Error in adding add on', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
        deleteCartItem: async(_, {cartItemId}) => {
            try {
                await CartItemAddOn.deleteMany({cartItemId});
                const data = await CartItem.findByIdAndDelete(cartItemId);
                return data;
            } catch(err) {
                console.log('Error in adding add on', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
        updateCartDetails: async(_, {input}) => {
            try {
                const cart = await Cart.findByIdAndUpdate(input._id, input, {
                    new: true
                });
                return cart;
            } catch(err) {
                console.log('Error in updating cart details', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
    },
    Query: {
        getCartItems: async(_, {cartId}) => {
            try {
                return await CartItem.find({ cartId: cartId });
            } catch(err) {
                console.log('Error in fetching cart', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
        getCart: async(_, {cartId}) => {
            try {
                return await Cart.findById(cartId);
            } catch(err) {
                console.log('Error in fetching note', err);
                throw new Error(err.message || 'Internal Server error');
            }
        }
    },
    CartItem: {
        menu: async(parent) => {
            try {
                return await Menu.findById(parent.menuId);
            } catch(err) {
                console.log('Error in fetching cart menu', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
        variant: async(parent) => {
            try {
                return await MenuVariant.findById(parent.variantId);
            } catch(err) {
                console.log('Error in fetching cart menu variant', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
        addon: async(parent) => {
            try {
                const cartAddonsList =  await CartItemAddOn.find({ cartItemId: parent._id });
                const ids = cartAddonsList.map(addOn => addOn.addOnId);
                return await MenuAddons.find({ _id: { $in: ids } });
            } catch(err) {
                console.log('Error in fetching cart menu addons', err);
                throw new Error(err.message || 'Internal Server error');
            }
        }
    }
}

export default cartResolver;