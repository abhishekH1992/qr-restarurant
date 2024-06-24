import CategoryType from "../../models/categoryType.model.js";
import Category from "../../models/category.model.js";
import SubCategory from "../../models/subCategory.model.js";
import Menu from "../../models/menu.model.js";
import MenuAddons from "../../models/menuAddons.model.js";
import MenuVariant from "../../models/menuVariant.model.js";

const menuTreeSeeder = async() => {
    try {
        await Category.deleteMany();
        await SubCategory.deleteMany();
        await Menu.deleteMany();
        await MenuAddons.deleteMany();
        await MenuVariant.deleteMany();

        const categoryType = await CategoryType.find();
        const items = [
            {
                category: "THE BASICS",
                sub: [
                    {
                        name: "SANDWICH",
                        menu: ['VEG GRILLED', 'CHEESE GRILLED', 'VEG CLUB GRILLED', 'CHICKEN GRILLED', 'LAMB GRILLED'],
                        addons: ['Extra Cheese', 'Extra Meat', 'Extra Veggie', 'Extra Sause', 'Extra Spicy', 'Peri-Peri'],
                        variant: ['Small Portion', 'Medium Portion', 'Large Portion']
                    },
                    {
                        name: "TOAST",
                        menu: ['CHEESE TOAST', 'AVACADO TOAST'],
                        addons: ['Extra Cheese', 'Extra Avacado', 'Extra Spicy', 'Peri-Peri'],
                        variant: ['Small Portion', 'Large Portion']
                    },
                    {
                        name: "PANCAKE",
                        menu: ['KIWI PANCAKE', 'ENGLISH PANCAKE WITH LEMON AND SUGAR'],
                        addons: ['Extra Honey', 'Maple Syrup'],
                        variant: ['Small Portion', 'Medium Portion', 'Large Portion']
                    },
                    {
                        name: "BURGER",
                        menu: ['VEG BURGER', 'VEG CHEESE BURGER', 'CHICKEN BURGER', 'CHICKEN CHEESE BURGER', 'HAMBURGER', 'LAMB BURGER'],
                        addons: ['Extra Cheese', 'Extra Meat', 'Extra Veggie', 'Extra Sause', 'Extra Spicy', 'Peri-Peri', 'Extra Fries'],
                        variant: ['Kids', 'Combo (wtih Fries)']
                    },
                    {
                        name: "PIZZA",
                        menu: ['CHEESE LOVER', 'CHIPOTLE CHICKEN', 'PESTO CHICKEN', 'CHICKEN BBQ', 'CHICKEN SLINGSHOT', 'CHICKEN PERI PERI', 'MEAT LOVERS', 'BBQ BEEF AND MEAT', 'HOT AND SPICY BEEF', 'KIWI SUPRIME', 'GARLIC LAMB AND PEPPER'],
                        addons: ['Extra Cheese', 'Extra Meat', 'Extra Veggie', 'Extra Sause', 'Extra Spicy', 'Peri-Peri'],
                        variant: ['Small', 'Medium', 'Large']
                    },
                ]
            },
            {
                category: "SPECIALITY",
                sub: [
                    {
                        name: "PASTA",
                        menu: ['CHEESE SAUSAGE PASTA', 'CHICKEN ALFREDO', 'BIG KALE PASTA SALAD', 'MACARONI SALAD'],
                        addons: ['Extra Cheese', 'Extra Meat', 'Extra Veggie', 'Extra Sause', 'Extra Spicy', 'Peri-Peri'],
                        variant: ['Small Portion', 'Medium Portion', 'Large Portion']
                    },
                    {
                        name: "SUSHI",
                        menu: ['ABURI SALMON DRAGON ROLL', 'AVACADO MAKI', 'BEEF TERIYAKI'],
                        addons: ['Extra Sause'],
                        variant: ['4 Pieces', '6 Pieces', '8 Pieces', '10 Pieces', '12 Pieces']
                    },
                    {
                        name: "EGGS",
                        menu: ['SUNNY SIDE UP FRIED EGGS', 'CRISPY FRIED EGGS'],
                        addons: [],
                        variant: ['Small Portion', 'Large Portion']
                    }
                ]
            },
            {
                category: "COFFEE",
                sub: [
                    {
                        name: "CREAM ON TOP",
                        menu: ['FRAPPUCCINO', 'WHIPPED CREAM', 'VANILLA ON TOP'],
                        addons: ['Extra Cream'],
                        variant: ['Small', 'Medium', 'Large']
                    },
                    {
                        name: "COFFEE",
                        menu: ['BLACK COFFEE', 'COFFEE WITH MILK'],
                        addons: [],
                        variant: ['Small', 'Medium', 'Large']
                    }
                ]
            },
            {
                category: "TEA",
                sub: [
                    {
                        name: "TEA",
                        menu: ['LEMON TEA', 'TEA WITH MILK'],
                        addons: [],
                        variant: ['Small', 'Medium', 'Large']
                    },
                    {
                        name: "BUBBLE TEA",
                        menu: ['BLACKBERRY BUBBLE TEA', 'CLASSIC'],
                        addons: [],
                        variant: ['Small', 'Medium', 'Large']
                    }
                ]
            },
            {
                category: "LIQUOR",
                sub: [
                    {
                        name: "BEER",
                        menu: ["STELLA", "BUDWEISER", "HEINEKEN", "TIGER"],
                        addons: [],
                        variant: [],
                    }
                ]
            }
        ];

        const description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

        for (const item of items) {
            let cat1 = new Category({
                name: item.category,
                slug: item.category.toLowerCase().split(" ").join("-"),
                isEnable: true,
                categoryType: item.category == 'LIQUOR' ? categoryType[1] : categoryType[0],
                image: './../category/'+item.category.toLowerCase().split(" ").join("-")+'.png',
            });

            let cat = await cat1.save();

            for(const s of item.sub) {
                let sub1 = new SubCategory({
                    name: s.name,
                    category: cat._id,
                    isEnable: true,
                    image: './../subcategory/'+s.name.toLowerCase().split(" ").join("-")+'.png'
                });

                let sub = await sub1.save();

                for(const menu of s.menu) {
                    let menuData1 = {};
                    if(s.name == 'BEER') {
                        let price = (Math.random() * (10.99 - 5.99) + 5.99).toFixed(2).toString();
                        price = price.slice(0, -1) + (Math.random() < 0.5 ? '0' : '9');
                        menuData1 = new Menu({
                            name: menu,
                            description: sub.name+' '+menu+' - '+description,
                            image: './../menu/'+menu.toLowerCase().split(" ").join("-")+'.png',
                            fixedPrice: parseFloat(price),
                            lowestPrice: parseFloat(price),
                            highestPrice: parseFloat(price) + 5,
                            currentPrice: parseFloat(price),
                            step: 0.5,
                            isEnable: true,
                            subCategory: sub._id
                        })
                    } else {
                        let price = (Math.random() * (29.99 - 5.99) + 5.99).toFixed(2).toString();
                        price = price.slice(0, -1) + (Math.random() < 0.5 ? '0' : '9');
                        menuData1 = new Menu({
                            name: menu,
                            description: sub.name+' '+menu+' - '+description,
                            image: './../menu/'+menu.toLowerCase().split(" ").join("-")+'.png',
                            fixedPrice: parseFloat(price),
                            isEnable: true,
                            subCategory: sub._id
                        })
                    }

                    let menuData = await menuData1.save();

                    for(const add of s.addons) {
                        let price = (Math.random() * (5.99 - 5.99) + 5.99).toFixed(2).toString();
                        price = price.slice(0, -1) + (Math.random() < 0.5 ? '0' : '9');
                        let a = new MenuAddons({
                            name: add,
                            price: parseFloat(price),
                            menu: menuData._id
                        })
                        await a.save();
                    }
                    let price = 0;
                    for(const variant of s.variant) {
                        if(price) {
                            price = parseFloat(price) + 2;
                        } else {
                            price = (Math.random() * (20.99 - 5.99) + 5.99).toFixed(2).toString();
                            price = price.slice(0, -1) + (Math.random() < 0.5 ? '0' : '9');
                        }

                        let v = new MenuVariant({
                            name: variant,
                            price: price,
                            menu: menuData._id
                        });

                        await v.save();
                    }
                }
            }
        }

        console.log("Category tree created successfully");
    } catch(err) {
        console.error("Error seeding catgeoryType:", err);
        process.exit(1);
    }
}

export default menuTreeSeeder;