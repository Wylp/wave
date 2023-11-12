const { 
    deleteFloodRepositories
} = require('../../repositories');

const { rollbackTransaction, getTransaction, commitTransaction } = require('../../../../common');

const deleteFloodService = async ({
    flood_id
} = {}) => {

    const {
        transaction
    } = await getTransaction({
        db: process.env.POSTGRES_DB
    });

    try {
        await deleteFloodRepositories({
            flood_id,
            status: "inactive",
            transaction
        })

        await commitTransaction({ transaction })
        
    } catch (error) {
        console.error(error)
        await rollbackTransaction({ transaction })
        throw error;
    }
}

module.exports = {
    deleteFloodService
}