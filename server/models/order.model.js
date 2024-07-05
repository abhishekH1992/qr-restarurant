import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    tableId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Table",
		required: false,
	},
	note: {
        type: String,
    },
    orderNumber: {
        type: String,
        required: true,
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
		ref: "Cart",
		required: false,
    }
}, { timestamps: true })

const Order = mongoose.model("Order", orderSchema);

export default Order;