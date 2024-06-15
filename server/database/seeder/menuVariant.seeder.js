import SubCategory from "../../models/subCategory.model.js";
import Menu from "../../models/menu.model.js";
import MenuVariant from "../../models/menuVariant.model.js";

const menuVariantSeeder = async() => {
    try {
        const isExists = await MenuVariant.collection.countDocuments();
        if(!isExists) {
            const seeder = ['Small Portion', 'Medium Portion', 'Large Portion'];
            const subCategory = await SubCategory.findOne();
            const menus = await Menu.find({ subCategory: subCategory._id });
            const arr = [];
            menus.map((menu) => {
                seeder.map((add) => {
                    arr.push({
                        name: add,
                        price: (Math.random() * (10.99 - 0.99) + 0.99).toFixed(2),
                        menu: menu._id
                    });
                })
            });

            await MenuVariant.insertMany(arr);
            console.log("MenuVariant created successfully");
        } else {
            console.log("MenuVariant already exists");
        }
    } catch(err) {
        console.error("Error seeding menu-variant:", err);
        process.exit(1);
    }
}

export default menuVariantSeeder;