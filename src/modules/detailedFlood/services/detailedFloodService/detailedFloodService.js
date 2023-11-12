const { 
    getDetailedFloodRepositories, 
    getUsersContributionRepositories
} = require('../../repositories');

const detailedFloodService = async ({
    flood_id,
    user_id
} = {}) => {
    try {

        const {
            flood_center_location,
            start_date,
            end_date,
            status,
            flood_radius
        } = await getDetailedFloodRepositories({
            flood_id
        })

        const {
            actual_user_contribution,
            another_users
        } = await getUsersContributionRepositories({
            flood_id,
            user_id
        });

        return {
            flood_id,
            user_id: actual_user_contribution.user_id,
            flood_center_location,
            user_location: {
                latitude: actual_user_contribution.user_location.x,
                longitude: actual_user_contribution.user_location.y
            },
            start_date,
            end_date,
            water_level: actual_user_contribution.water_level,
            description: actual_user_contribution.user_description,
            status,
            flood_radius,
            users: another_users
        }
    } catch (error) {
        console.error(error)
        throw error;
    }
}

module.exports = {
    detailedFloodService
}