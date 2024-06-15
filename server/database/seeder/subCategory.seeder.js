import Category from "../../models/category.model.js";
import SubCategory from "../../models/subCategory.model.js";

const subCategorySeeder = async() => {
    try {
        const isExists = await SubCategory.collection.countDocuments();
        if(!isExists) {
            const categories = await Category.find();
            const sub = [
                ['SANDWICH', 'TOAST', 'PANCAKE', 'BURGER', 'PIZZA'],
                ['PASTA', 'SUSHI', 'EGGS'],
                ['CREAM ON TOP', 'COFFEE'],
                ['TEA', 'BUBBLE TEA']
            ];
            const data = [];
            categories.map((category, key) => {
                sub[key].map((s) => {
                    data.push({
                        name: s,
                        category: category._id,
                        isEnable: true,
                        image: './../public/subcategory/'+s.toLowerCase().split(" ").join("-")+'.png'
                    });
                })
            });
            await SubCategory.insertMany(data);
            console.log("Sub-Categories created successfully");
        } else {
            console.log("Sub-Categories already exists");
        }
    } catch(err) {
        console.error("Error seeding sub-category:", err);
        process.exit(1);
    }
}

export default subCategorySeeder;