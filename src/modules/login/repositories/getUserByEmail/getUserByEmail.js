const {
    getConnection
} = require('../../../../common')

const getUserByEmail = async ({
    email
}) => {
    try{

        const {
            connection
        } = await getConnection();

        const [user_with_same_email] = await connection('users').where({
            user_email: email
        })

        return {
            user_with_same_email
        };
    }catch(err){
        console.log(err)
        throw err;
    }
}

module.exports = {
    getUserByEmail
}