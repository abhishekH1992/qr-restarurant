import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    fixedPrice: {
        type: Number,
        required: true
    },
    lowestPrice: {
        type: Number
    },
    highestPrice: {
        type: Number
    },
    step: {
        type: Number
    },
    currentPrice: {
        type: Number
    },
    isEnable: {
        type: Boolean,
        default: true
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
		ref: "SubCategory",
		required: true,
    }
});

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;