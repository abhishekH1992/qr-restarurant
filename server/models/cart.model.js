import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    tableId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Table",
		required: false,
	},
})

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;