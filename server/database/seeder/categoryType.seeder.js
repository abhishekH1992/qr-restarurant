import CategoryType from "../../models/categoryType.model.js";

const catgeoryTypeSeeder = async() => {
    try {
        // TODO: Error while getting collection count 
        // const isExists = new CategoryType.collection.estimatedDocumentCount();
        // await CategoryType.deleteMany();
        const isExists = true;
        if(!isExists) {
            const data = await CategoryType.insertMany([
                { name: 'Food', isBidable: false },
                { name: 'Liquor', isBidable: true }
            ]);
            console.log("catgeoryType created successfully");
            return data;
        } else {
            const data = await CategoryType.find();
            console.log("catgeoryType already exists");
            return data;
        }
    } catch(err) {
        console.error("Error seeding catgeoryType:", err);
        process.exit(1);
    }
}

export default catgeoryTypeSeeder;