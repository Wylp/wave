const { 
    listFloodRepositories, 
    getUsersContributionRepositories
} = require('../../repositories');

const listFloodService = async ({
    latitude,
    longitude,
    user_id
} = {}) => {
    try {

        const floods = await listFloodRepositories({
            latitude,
            longitude
        });

        const floods_id = floods.map(flood => flood.flood_id);

        const {
            actual_user_contribution,
            another_users
        } = await getUsersContributionRepositories({
            floods_id,
            user_id
        });

        const actual_user_contribution_by_flood_id = actual_user_contribution.reduce((acc, user) => {
            acc[user.flood_id] = user;
            return acc;
        }, {});

        const another_users_by_flood_id = another_users.reduce((acc, user) => {
            if (!acc[user.flood_id]) {
                acc[user.flood_id] = [];
            }

            acc[user.flood_id].push({
                user_id: user.user_id,
                first_name: user.first_name
            });

            return acc;
        }, {});

        return floods.map(flood => {

            const flood_user_contribution = actual_user_contribution_by_flood_id[flood.flood_id];

            return {
                flood_id: flood.flood_id,
                user_id: flood_user_contribution?.user_id,
                flood_center_location: {
                    latitude: flood?.flood_center_location?.x,
                    longitude: flood?.flood_center_location?.y
                },
                user_location: {
                    latitude: flood_user_contribution?.user_location?.x,
                    longitude: flood_user_contribution?.user_location?.y
                },
                start_date: flood.start_date,
                end_date: flood.end_date,
                water_level: flood_user_contribution?.water_level,
                description: flood_user_contribution?.user_description,
                status: flood.status,
                flood_radius: flood.flood_radius,
                users: another_users_by_flood_id[flood.flood_id] || []
            }
        })
    } catch (error) {
        console.error(error)
        throw error;
    }
}

module.exports = {
    listFloodService
}