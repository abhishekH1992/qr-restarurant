import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    isEnable: {
        type: Boolean,
        default: true
    },
    category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
		required: true,
	}, 
})

const SubCategory = mongoose.model("SubCategory", subCategorySchema);
export default SubCategory;