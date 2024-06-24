import mongoose from "mongoose";

const orderItemAddonsSchema = new mongoose.Schema({
    orderItemId: {
        type: mongoose.Schema.Types.ObjectId,
		ref: "OrderItem",
		required: true,
    },
    addOnId: {
        type: mongoose.Schema.Types.ObjectId,
		ref: "MenuAddons",
		required: true,
    }
});

const OrderItemAddOn = mongoose.model("OrderItemAddOn", orderItemAddonsSchema);

export default OrderItemAddOn;