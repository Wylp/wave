const bcrypt = require('bcryptjs');

const { 
    createFloodRepositories 
} = require('../../repositories/createFloodRepositories/createFloodRepositories');

const {
    verifyAlreadyUserByEmail
} = require('../verifyAlreadyUserByEmail/verifyAlreadyUserByEmail')

const createFloodService = async ({
    firstName,
    lastName,
    username,
    password,
    email,
    userLocation
} = {}) => {
    try {

        await verifyAlreadyUserByEmail({
            email
        });

        const hashPassword = bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS));
        
        await createFloodRepositories({
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
    createFloodService
}