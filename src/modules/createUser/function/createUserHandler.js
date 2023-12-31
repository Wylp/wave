const httpStatusCodes = require('http-status-codes')

const { 
    httpErrorHandler 
} = require('../../../common')

const { 
    createUserService
} = require('../services');

const createUserHandler = async (req, res, next) => {
    try {
        const {
            first_name: firstName,
            last_name: lastName,
            username,
            password,
            email,
            user_location: user_location
        } = req.body;

        await createUserService({
            firstName,
            lastName,
            username,
            email,
            password,
            user_location
        });

        return res.status(httpStatusCodes.OK).send();
    } catch (error) {
        return httpErrorHandler({ req, res, error })
    }
}

module.exports = {
    createUserHandler
}