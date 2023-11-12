const { format } = require('date-fns');
const { v5 } = require('uuid');

const createFloodRepositories = async ({
    flood_center_location,
    start_date,
    end_date,
    status,
    flood_radius,
    transaction
}) => {
    try {

        const formated_start_date = format(new Date(start_date), "yyyy-MM-dd");
        const key = [formated_start_date, Object.values(flood_center_location).join(":")].join("_");
        const flood_id = v5(key, v5.URL);

        await transaction("floods").insert({
            flood_id,
            flood_center_location: `(${flood_center_location.latitude},${flood_center_location.longitude})`,
            start_date,
            end_date,
            status,
            flood_radius
        })

        return {
            flood_id
        }
    }catch(err){
        console.error(err)
        throw err;
    }
}

module.exports = {
    createFloodRepositories
}