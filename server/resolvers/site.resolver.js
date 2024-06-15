import Site from "../models/site.model.js";

const siteResolver = {
    Query: {
        site: async() => {
            try {
                const site = await Site.findOne();
                return site;
            } catch(err) {
                console.log('Error in fetching Site', err);
                throw new Error(err.message || 'Internal Server error');
            }
        }
    },
    Mutation: {
        updateSite: async(_, {input}) => {
            try {
                const data = await Site.findOneAndUpdate({ restaurant_id: input.restaurant_id }, input, {
                    new: true
                });
                return data;
            } catch (err) {
                console.log('Error in storing Site', err);
                throw new Error(err.message || 'Internal Server error');
            }
        }
    }
}

export default siteResolver;