import mongoose from "mongoose";

const menuAddonsSchema = new mongoose.Schema({
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

const MenuAddons = mongoose.model("MenuAddons", menuAddonsSchema);

export default MenuAddons;