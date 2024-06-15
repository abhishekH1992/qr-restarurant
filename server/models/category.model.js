import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    isEnable: {
        type: Boolean,
        default: true
    },
    categoryType: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "CategoryType",
		required: true,
	}, 
});

const Category = mongoose.model("Category", categorySchema);

export default Category;