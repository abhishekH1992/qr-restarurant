import Site from "../../models/site.model.js";

const siteSeeder = async () => {
    const data = new Site({
        restaurant_id: 1,
        name: 'ABC Restaurant',
        email: 'abhishekhonrao103@gmail.com',
        logo: './../logo.png',
        banner: [
            './../banner/1.png',
            './../banner/2.png',
            './../banner/3.png',
        ],
        stripePublishKey: "pk_test_zLMiBOLYLNfs80WvoZOoLSTU",
        stripeSecretKey: "sk_test_vuHTmN8kjsDLa6SYuyJ3cOuP"
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