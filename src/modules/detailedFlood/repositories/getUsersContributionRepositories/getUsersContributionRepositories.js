const { getConnection } = require("../../../../common");

const getUsersContributionRepositories = async ({
    flood_id,
    user_id
}) => {
    try {

        const {
            connection
        } = await getConnection();

        const [
            actual_user_contribution
        ] = await connection("users_contribution").where({
            flood_id,
            user_id
        })

        const query = `
            SELECT
                users_contribution.user_id,
                users.first_name
            FROM users_contribution
            LEFT JOIN users 
            ON users.user_id = users_contribution.user_id
            WHERE 
                users_contribution.flood_id = :flood_id
            AND
                users_contribution.user_id != :user_id
        `

        const {
            rows: another_users
        } = await connection.raw(query, {
            flood_id,
            user_id
        })

        return {
            actual_user_contribution,
            another_users
        }

    } catch (err) {
        console.error(err)
        throw err;
    }
}

module.exports = {
    getUsersContributionRepositories
}