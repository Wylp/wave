const {
    getDetailedFloodRepositories,
    updateFloodRepositories,
    getUserContributionRepositories,
    updateUserContributionRepositories,
    createUserContributionsRepositories
} = require('../../repositories');

const { 
    verifyUserProximity 
} = require('../verifyUserProximity/verifyUserProximity');

const { 
    rollbackTransaction, 
    getTransaction, 
    commitTransaction 
} = require('../../../../common');

const updateFloodService = async ({
    user_location,
    date_time,
    water_level,
    description,
    req_status,
    user_id,
    is_admin,
    flood_id
} = {}) => {

    const {
        transaction
    } = await getTransaction({
        db: process.env.POSTGRES_DB
    });

    try {

        const {
            flood_center_location,
            end_date,
            status,
            flood_radius
        } = await getDetailedFloodRepositories({
            flood_id
        })

        const {
            user_distance
        } = await verifyUserProximity({
            flood_center_location,
            user_location
        })

        const new_radius = user_distance > flood_radius ? user_distance : flood_radius
        const new_end_date = new Date(date_time) > new Date(end_date) ? date_time : end_date
        const new_status = is_admin ? req_status : status

        await updateFloodRepositories({
            flood_id,
            end_date: new_end_date,
            status: new_status,
            flood_radius: new_radius,
            transaction
        })

        const user_contribution = await getUserContributionRepositories({
            flood_id,
            user_id
        })

        const this_user_has_contribuition = Array.isArray(user_contribution) && user_contribution.length > 0

        if (this_user_has_contribuition) {
            await updateUserContributionRepositories({
                flood_id,
                user_id,
                user_location,
                water_level,
                description,
                transaction
            })

            await commitTransaction({ transaction })

            return {
                flood_id
            }
        }

        await createUserContributionsRepositories({
            flood_id,
            user_id,
            user_location,
            water_level,
            description,
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
    updateFloodService
}