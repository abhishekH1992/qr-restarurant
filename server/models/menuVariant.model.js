import mongoose from "mongoose";

const menuVariantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    menu: {
        type: mongoose.Schema.Types.ObjectId,
		ref: "Menu",
		required: true
    }
});

const MenuVariant = mongoose.model("MenuVariant", menuVariantSchema)

export default MenuVariant;