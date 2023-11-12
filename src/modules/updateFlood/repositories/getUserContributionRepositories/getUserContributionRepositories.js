const { getConnection } = require("../../../../common");

const getUserContributionRepositories = async ({
    flood_id,
    user_id
}) => {
    try {

        const {
            connection
        } = await getConnection();

        const actual_user_contribution = await connection("users_contribution").where({
            flood_id,
            user_id
        });

        return actual_user_contribution;

    } catch (err) {
        console.error(err)
        throw err;
    }
}

module.exports = {
    getUserContributionRepositories
}