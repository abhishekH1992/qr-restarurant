import mongoose from 'mongoose';
import siteSeeder from './seeder/site.seeder.js';
import tableSeeder from './seeder/table.seeder.js';
import categoryTypeSeeder from './seeder/categoryType.seeder.js';
import categorySeeder from './seeder/category.seeder.js';
import subCategorySeeder from './seeder/subCategory.seeder.js';
import menuSeeder from './seeder/menu.seeder.js';
import menuAddonsSeeder from './seeder/menuAddOnsSeeder.js';
import menuVariantSeeder from './seeder/menuVariant.seeder.js';

import Cart from "../models/cart.model.js";
import CartItem from "../models/cartItem.model.js";
import CartItemAddOn from "../models/cartItemAddOn.model.js";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('MangoDB Connected');

        // Seeders
        await siteSeeder();
        await tableSeeder();
        await categoryTypeSeeder();
        await categorySeeder();
        await subCategorySeeder();
        await menuSeeder();
        await menuAddonsSeeder();
        await menuVariantSeeder();

        // await Cart.deleteMany();
        // await CartItem.deleteMany();
        // await CartItemAddOn.deleteMany();

        console.log('Seeders generated');
    } catch (err) {
        console.log(process.env.MONGO_URI, err);
        process.exit(1);
    }
}