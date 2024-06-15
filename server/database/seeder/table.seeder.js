import Table from "../../models/table.model.js";

const tableSeeder = async() => {
    try {
            const count = await Table.collection.countDocuments();
            if(!count) {
                const alphabets = ['A', 'B', 'C', 'D'];
                const rows = [1, 2, 3, 4, 5];
                const tables = [];
                const names = [];
                alphabets.map((a) => {
                    rows.map((r) => {
                        tables.push({'name': a+r});
                        names.push(a+r);
                    })
                });
                await Table.insertMany(tables);
                console.log("Tables created successfully");
            } else {
                console.log("Tables already exists");
            }
    } catch(err) {
        console.error("Error seeding table:", err);
        process.exit(1);
    }
}

export default tableSeeder;