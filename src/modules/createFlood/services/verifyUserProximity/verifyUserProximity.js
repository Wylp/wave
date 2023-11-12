const { getDistance } = require("geolib");

const verifyUserProximity = async ({
    flood_center_location,
    user_location
}) => {
    try {
        
        const user_distance = getDistance(
            {
                latitude: flood_center_location.latitude,
                longitude: flood_center_location.longitude
            },
            {
                latitude: user_location.latitude,
                longitude: user_location.longitude
            }
        );

        const user_distance_is_greater_than_allow = user_distance > process.env.USER_DISTANCE_ALLOW;

        if(user_distance_is_greater_than_allow){
            throw {
                message: `User distance is greater than allow: ${process.env.USER_DISTANCE_ALLOW} meters`,
                statusCode: 400
            }
        }

        return {
            user_distance
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    verifyUserProximity
}