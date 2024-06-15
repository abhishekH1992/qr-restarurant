import CategoryType from "../../models/categoryType.model.js";
import Category from "../../models/category.model.js";

const categorySeeder = async() => {
    try {
        const categories = ['THE BASICS', 'SPECIALITY', 'COFFEE', 'TEA'];
        const arr = [];
        const categoryType = await CategoryType.findOne();

        const count = await Category.collection.countDocuments();
        if(!count) {
            categories.map((category) => {
                arr.push({
                    name: category,
                    slug: category.toLowerCase().split(" ").join("-"),
                    isEnable: true,
                    categoryType: categoryType
                });
            });
            await Category.insertMany(arr);
            console.log("Categories created successfully");
        } else {
            console.log("Categories already exists");
        }
    } catch(err) {
        console.error("Error seeding catgeoryType:", err);
        process.exit(1);
    }
}

export default categorySeeder;