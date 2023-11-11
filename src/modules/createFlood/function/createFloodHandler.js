const httpStatusCodes = require('http-status-codes')

const { 
    httpErrorHandler 
} = require('../../../common')

const { 
    createFloodService
} = require('../services');

const createFloodHandler = async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            username,
            password,
            email,
            userLocation
        } = req.body;

        await createFloodService({
            firstName,
            lastName,
            username,
            email,
            password,
            userLocation
        });

        return res.status(httpStatusCodes.OK).send();
    } catch (error) {
        return httpErrorHandler({ req, res, error })
    }
}

module.exports = {
    createFloodHandler
}