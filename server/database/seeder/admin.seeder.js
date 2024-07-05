import Admin from "../../models/admin.model.js";
import bcrypt from 'bcryptjs'

const adminSeeder = async() => {
    try {
        // TODO: Error while getting collection count 
        // const isExists = new Admin.collection.countDocuments();
        const isExists = true;
        if(!isExists) {
            const password = await bcrypt.hash('password', 10);

            const data = await Admin.insertMany([
                { email: 'admin@restaurant.com', password },
            ]);
            console.log("admin created successfully");
            return data;
        }
    } catch(err) {
        console.error("Error seeding admin:", err);
        process.exit(1);
    }
}

export default adminSeeder;