import mongoose from "mongoose";

const siteSchema = new mongoose.Schema({
    restaurant_id: {
        type: Number,
        required: true,
    },
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
    },
    stripePublishKey: {
        type: String,
        required: true
    },
    stripeSecretKey: {
        type: String,
        required: true
    },
});

const Site = mongoose.model('Site', siteSchema);

export default Site;