import Table from "../models/table.model.js";

const tableResolver = {
    Query: {
        table: async() => {
            try {
                const table = await Table.find();
                return table;
            } catch(err) {
                console.log('Error in fetching Table', err);
                throw new Error(err.message || 'Internal Server error');
            }
        }
    },
    Mutation: {
        storeTable: async(_, {input}) => {
            try {
                const table = new Table({
                    ...input
                });

                const data = await table.save();
                return data;
            } catch (err) {
                console.log('Error in storing table', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
        updateTable: async(_, {input}) => {
            try {
                const data = await Table.findByIdAndUpdate(input._id, input, {
                    new: true
                });
                return data;
            } catch (err) {
                console.log('Error in updating table', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
        deleteTable: async(_, {id}) => {
            try {
                const data = await Table.findByIdAndDelete(id)
                return data
            } catch (err) {
                console.log('Error in deleting table', err)
                throw new Error(err.message || 'Internal Server Error')
            }
        }
    }
}

export default tableResolver;