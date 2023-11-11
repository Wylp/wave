const {
    getUserByEmail
} = require("../../repositories")

const verifyAlreadyUserByEmail = async ({
    email
}) => {
    try{
        const userWithEmail = await getUserByEmail({
            email
        })

        const has_user_email = Array.isArray(userWithEmail) && userWithEmail.length > 0;

        if(has_user_email){
            throw {
                statusCode: 400,
                message: "User already exists with this email" 
            }
        }
    }catch(err){
        console.log(err)
        throw err;
    }
}

module.exports = {
    verifyAlreadyUserByEmail
}