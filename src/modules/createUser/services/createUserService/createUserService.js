const bcrypt = require('bcryptjs');

const { 
    createUserRepositories 
} = require('../../repositories/createUserRepositories/createUserRepositories');

const {
    verifyAlreadyUserByEmail
} = require('../verifyAlreadyUserByEmail/verifyAlreadyUserByEmail')

const createUserService = async ({
    firstName,
    lastName,
    username,
    password,
    email,
    user_location
} = {}) => {
    try {

        await verifyAlreadyUserByEmail({
            email
        });

        const hashPassword = bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS));
        
        await createUserRepositories({
            firstName,
            lastName,
            username,
            email,
            password: hashPassword
        })

    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUserService
}