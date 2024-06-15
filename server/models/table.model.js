import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

const Table = mongoose.model('Table', tableSchema);

export default Table;