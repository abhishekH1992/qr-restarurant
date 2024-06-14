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
        storeSite: async(_, {input}) => {
            try {
                const site = new Site({
                    ...input
                });

                await site.save();
                return site;
            } catch (err) {
                console.log('Error in fetching Site', err);
                throw new Error(err.message || 'Internal Server error');
            }
        }
    }
}

export default siteResolver;