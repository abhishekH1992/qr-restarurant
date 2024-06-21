import Site from "../../models/site.model.js";

const siteSeeder = async () => {
    const data = new Site({
        restaurant_id: 1,
        name: 'ABC Restaurant',
        email: 'abhishekhonrao103@gmail.com',
        logo: './../public/logo.png',
        banner: [
            './../public/banner/1.png',
            './../public/banner/2.png',
            './../public/banner/3.png',
        ]
    });
    try {
        const isSiteExists = await Site.findOne({ name: data.name });
        if(!isSiteExists) {
            await data.save();
            console.log("Site created successfully");
        } else {
            console.log("Site already exists");
        }
    } catch(err) {
        console.error("Error seeding site:", err);
        process.exit(1);
    }
};

export default siteSeeder;