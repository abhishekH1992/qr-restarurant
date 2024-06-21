import mongoose from "mongoose";

const cartItemScema = new mongoose.Schema({
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
		ref: "Cart",
		required: true,
    },
    menuId: {
        type: mongoose.Schema.Types.ObjectId,
		ref: "Menu",
		required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    variantId: {
        type: mongoose.Schema.Types.ObjectId,
		ref: "MenuVariant",
		required: false,
    },
    salePrice: {
        type: Number,
        required: true
    }
});

const CartItem = mongoose.model("CartItem", cartItemScema);

export default CartItem;