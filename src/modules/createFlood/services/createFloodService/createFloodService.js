const { 
    createFloodRepositories,
    createUserContributionsRepositories
} = require('../../repositories');

const { verifyUserProximity } = require('../verifyUserProximity/verifyUserProximity');
const { rollbackTransaction, getTransaction, commitTransaction } = require('../../../../common');

const createFloodService = async ({
    flood_center_location,
    user_location,
    date_time,
    water_level,
    description,
    user_id
} = {}) => {

    const {
        transaction
    } = await getTransaction({
        db: process.env.POSTGRES_DB
    });

    try {
        const {
            user_distance
        } = await verifyUserProximity({
            flood_center_location,
            user_location
        })

        const {
            flood_id
        } = await createFloodRepositories({
            flood_center_location: flood_center_location,
            start_date: date_time,
            end_date: date_time,
            status: "pending",
            flood_radius: user_distance,
            transaction
        })

        await createUserContributionsRepositories({
            flood_id,
            user_id,
            user_location: user_location,
            water_level: water_level,
            description: description,
            transaction
        })

        await commitTransaction({ transaction })

        return {
            flood_id
        }
    } catch (error) {
        console.error(error)
        await rollbackTransaction({ transaction })
        throw error;
    }
}

module.exports = {
    createFloodService
}