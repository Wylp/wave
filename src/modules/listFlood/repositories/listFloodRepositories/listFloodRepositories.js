const { getConnection } = require("../../../../common");

const listFloodRepositories = async ({
    latitude,
    longitude
}) => {
    try {

        const {
            connection
        } = await getConnection();

        const query = `
            select 
                *
            from floods f
            where
                (
                    f.flood_center_location 
                    <@> 
                    point(:latitude, :longitude)
                ) < (:max_distance / 1609.344)
        `


        const {rows} = await connection.raw(query, {
            latitude,
            longitude,
            max_distance: 1000
        });

        return rows;

    } catch (err) {
        console.error(err)
        throw err;
    }
}

module.exports = {
    listFloodRepositories
}