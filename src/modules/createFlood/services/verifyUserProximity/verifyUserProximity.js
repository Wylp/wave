const { getDistance } = require("geolib");

const verifyUserProximity = async ({
    floodLocation,
    userLocation
}) => {
    try {
        
        const user_distance = getDistance(
            {
                latitude: floodLocation.latitude,
                longitude: floodLocation.longitude
            },
            {
                latitude: userLocation.latitude,
                longitude: userLocation.longitude
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