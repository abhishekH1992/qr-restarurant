import Menu from "../../models/menu.model.js";
import MenuAddons from "../../models/menuAddons.model.js";

const menuAddonsSeeder = async() => {
    try {
        const isExists = await MenuAddons.collection.countDocuments();
        if(!isExists) {
            const seederAddons = ['Extra Cheese', 'Extra Meat', 'Extra Veggie', 'Extra Sause', 'Extra Spicy', 'Peri-Peri'];
            const menus = await Menu.find();
            const arr = [];
            menus.map((menu) => {
                const shuffled = seederAddons.sort(() => 0.5 - Math.random());
                let selected = shuffled.slice(0, 5);
                if(selected.length) {
                    selected.map((add) => {
                        arr.push({
                            name: add,
                            price: (Math.random() * (10.99 - 0.99) + 0.99).toFixed(2),
                            menu: menu._id
                        });
                    })
                }
            });

            await MenuAddons.insertMany(arr);
            console.log("MenuAddons created successfully");
        } else {
            console.log("MenuAddons already exists");
        }
    } catch(err) {
        console.error("Error seeding menu-addons:", err);
        process.exit(1);
    }
}

export default menuAddonsSeeder;