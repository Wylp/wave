const { 
    createFloodRepositories,
    createUserContributionsRepositories
} = require('../../repositories');

const { verifyUserProximity } = require('../verifyUserProximity/verifyUserProximity');
const { rollbackTransaction, getTransaction, commitTransaction } = require('../../../../common');

const createFloodService = async ({
    floodLocation,
    userLocation,
    dateTime,
    waterLevel,
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
            floodLocation,
            userLocation
        })

        const {
            flood_id
        } = await createFloodRepositories({
            flood_center_location: floodLocation,
            start_date: dateTime,
            end_date: dateTime,
            status: "pending",
            flood_radius: user_distance,
            transaction
        })

        await createUserContributionsRepositories({
            flood_id,
            user_id,
            user_location: userLocation,
            water_level: waterLevel,
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