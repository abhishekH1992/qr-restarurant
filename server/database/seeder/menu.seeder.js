import SubCategory from "../../models/subCategory.model.js";
import Menu from "../../models/menu.model.js";

const menuSeeder = async() => {
    try {
        const isExists = await Menu.collection.countDocuments();
        if(!isExists) {
            const menus = [
                ['VEG GRILLED', 'CHEESE GRILLED', 'VEG CLUB GRILLED', 'CHICKEN GRILLED', 'LAMB GRILLED'],
                ['CHEESE TOAST', 'AVACADO TOAST'],
                ['KIWI PANCAKE', 'ENGLISH PANCAKE WITH LEMON AND SUGAR'],
                ['VEG BURGER', 'VEG CHEESE BURGER', 'CHICKEN BURGER', 'CHICKEN CHEESE BURGER', 'HAMBURGER', 'LAMB BURGER'],
                ['CHEESE LOVER', 'CHIPOTLE CHICKEN', 'PESTO CHICKEN', 'CHICKEN BBQ', 'CHICKEN SLINGSHOT', 'CHICKEN PERI PERI', 'MEAT LOVERS', 'BBQ BEEF AND MEAT', 'HOT AND SPICY BEEF', 'KIWI SUPRIME', 'GARLIC LAMB AND PEPPER'],
                ['CHEESE SAUSAGE PASTA', 'CHICKEN ALFREDO', 'BIG KALE PASTA SALAD', 'MACARONI SALAD'],
                ['ABURI SALMON DRAGON ROLL', 'AVACADO MAKI', 'BEEF TERIYAKI'],
                ['SUNNY SIDE UP FRIED EGGS', 'CRISPY FRIED EGGS'],
                ['FRAPPUCCINO', 'WHIPPED CREAM', 'VANILLA ON TOP'],
                ['BLACK COFFEE', 'COFFEE WITH MILK'],
                ['LEMON TEA', 'TEA WITH MILK'],
                ['BLACKBERRY BUBBLE TEA', 'CLASSIC']
            ]
            const description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
            const arr = [];
            const subCategories = await SubCategory.find();

            subCategories.map((sub, key) => {
                menus[key].map((menu) => {
                    arr.push({
                        name: menu,
                        description: sub.name+' '+menu+' - '+description,
                        image: './../public/menu/'+menu.toLowerCase().split(" ").join("-")+'.png',
                        fixedPrice: (Math.random() * (30 - 5.99) + 5.99).toFixed(2),
                        isEnable: true,
                        subCategory: sub._id
                    });
                })
            });

            const seeder = await Menu.insertMany(arr);
            console.log("Menu created successfully");
        } else {
            console.log("Menu already exists");
        }
    } catch(err) {
        console.error("Error seeding Menu:", err);
        process.exit(1);
    }
}

export default menuSeeder;