const { compareSync } = require("bcryptjs");
const { 
    getUserByEmail 
} = require("../../repositories");
const { sign } = require("jsonwebtoken");

const loginService = async ({
    email,
    password
}) => {

    const {
        user_with_same_email
    } = await getUserByEmail({
        email
    })

    const has_registered_user = !!user_with_same_email && Object.keys(user_with_same_email).length > 0;

    if(has_registered_user === false){
        throw {
            statusCode: 400,
            message: "This user not exists"
        }
    }

    const is_correct_password = compareSync(password, user_with_same_email?.password_encrypted)

    if(is_correct_password === false){
        throw {
            statusCode: 400,
            message: "Wrong email or password"
        }
    }

    const {
        user_id,
        username,
        first_name,
        last_name,
        user_email
    } = user_with_same_email

    const token = sign({
        user_id,
        username,
        first_name,
        last_name,
        user_email,
        iat: Math.floor(Date.now() / 1000)
    }, process.env.TOKEN_SECRET, {
        expiresIn: "7 days"
    })

    return {
        token
    }
}

module.exports = {
    loginService
}