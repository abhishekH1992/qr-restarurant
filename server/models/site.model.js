import mongoose from "mongoose";

const siteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    banner: {
        type: [String],
        required: true
    }
});

const Site = mongoose.model('Site', siteSchema);

export default Site;