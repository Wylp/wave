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

        const userWithEmail = await connection('users').where({
            user_email: email
        })

        return userWithEmail;
    }catch(err){
        console.log(err)
        throw err;
    }
}

module.exports = {
    getUserByEmail
}