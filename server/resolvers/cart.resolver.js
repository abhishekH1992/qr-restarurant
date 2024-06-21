import Cart from "../models/cart.model.js";
import CartItem from "../models/cartItem.model.js";
import CartItemAddOn from "../models/cartItemAddOn.model.js";

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
                const cart = await Cart.findByIdAndUpdate(input._id, input, {
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
        }
    },
    Query: {
        getCart: async(_, {cartId}) => {
            try {
                return await Cart.findById(cartId);
            } catch(err) {
                console.log('Error in fetching cart', err);
                throw new Error(err.message || 'Internal Server error');
            }
        }
    }
}

export default cartResolver;