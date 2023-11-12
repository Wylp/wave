const updateUserContributionRepositories = async ({
    flood_id,
    user_id,
    water_level,
    description,
    user_location,
    transaction
}) => {
    try {

        await transaction("users_contribution").update({
            water_level,
            user_location: `(${user_location.latitude},${user_location.longitude})`,
            user_description: description,
            updated_at: new Date()
        }).where({
            flood_id,
            user_id
        })

    } catch (err) {
        console.error(err)
        throw err;
    }
}

module.exports = {
    updateUserContributionRepositories
}