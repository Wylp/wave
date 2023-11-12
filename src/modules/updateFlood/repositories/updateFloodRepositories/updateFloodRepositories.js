const updateFloodRepositories = async ({
    flood_id,
    end_date,
    status,
    flood_radius,
    transaction
}) => {
    try {
        await transaction("floods").update({
            end_date,
            status,
            flood_radius,
            update_at: new Date()
        }).where({
            flood_id
        })
    } catch (err) {
        console.error(err)
        throw err;
    }
}

module.exports = {
    updateFloodRepositories
}