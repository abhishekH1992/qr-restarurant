import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
		ref: "Order",
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
    },
});

const OrderItem = mongoose.model("OrderItem", orderItemSchema);

export default OrderItem;