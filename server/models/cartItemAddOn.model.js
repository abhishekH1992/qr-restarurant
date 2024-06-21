import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    cartItemId: {
        type: mongoose.Schema.Types.ObjectId,
		ref: "CartItem",
		required: true,
    },
    addOnId: {
        type: mongoose.Schema.Types.ObjectId,
		ref: "MenuAddons",
		required: true,
    }
});

const CartItemAddOn = mongoose.model("CartItemAddOn", cartItemSchema);

export default CartItemAddOn;