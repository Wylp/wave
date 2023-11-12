const createUserContributionsRepositories = async ({
    flood_id,
    user_id,
    water_level,
    description,
    user_location,
    transaction
}) => {
    try {

        await transaction("users_contribution").insert({
            flood_id,
            user_id,
            water_level,
            user_location: `(${user_location.latitude},${user_location.longitude})`,
            user_description: description,
        })

    } catch (err) {
        console.error(err)
        throw err;
    }
}

module.exports = {
    createUserContributionsRepositories
}