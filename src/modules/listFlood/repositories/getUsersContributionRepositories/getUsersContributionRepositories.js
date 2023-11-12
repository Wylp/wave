const { getConnection } = require("../../../../common");

const getUsersContributionRepositories = async ({
    floods_id,
    user_id
}) => {
    try {

        const {
            connection
        } = await getConnection();

        const query = `
            SELECT
                *
            FROM users_contribution
            WHERE 
                users_contribution.flood_id IN (
                    '${floods_id.join("', '")}'
                )
            AND
                users_contribution.user_id = '${user_id}'
        `

        const {
            rows: actual_user_contribution
        } = await connection.raw(query)

        const query_another_users = `
            SELECT
                users_contribution.user_id,
                users.first_name,
                users_contribution.flood_id
            FROM users_contribution
            LEFT JOIN users 
            ON users.user_id = users_contribution.user_id
            WHERE 
                users_contribution.flood_id IN (
                    '${floods_id.join("', '")}'
                )
            AND
                users_contribution.user_id != '${user_id}'
        `

        const {
            rows: another_users
        } = await connection.raw(query_another_users)


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