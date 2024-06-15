import mongoose from "mongoose";

const categoryTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

const CategoryType = mongoose.model('CategoryTypes', categoryTypeSchema);

export default CategoryType;