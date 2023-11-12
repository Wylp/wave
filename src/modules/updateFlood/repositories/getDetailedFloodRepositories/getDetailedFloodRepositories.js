const { getConnection } = require("../../../../common");

const getDetailedFloodRepositories = async ({
    flood_id
}) => {
    try {

        const {
            connection
        } = await getConnection();

        const [{
            flood_center_location,
            start_date,
            end_date,
            status,
            flood_radius,
        }] = await connection("floods").where({
            flood_id
        })

        return {
            flood_id,
            flood_center_location: {
                latitude: flood_center_location.x,
                longitude: flood_center_location.y
            },
            start_date,
            end_date,
            status,
            flood_radius
        }

    } catch (err) {
        console.error(err)
        throw err;
    }
}

module.exports = {
    getDetailedFloodRepositories
}