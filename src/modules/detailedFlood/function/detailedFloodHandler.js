const httpStatusCodes = require('http-status-codes')

const { 
    httpErrorHandler 
} = require('../../../common')

const { 
    detailedFloodService
} = require('../services');

const detailedFloodHandler = async (req, res, next) => {
    try {
        const {
            flood_id
        } = req.query;

        const {
            user_id
        } = req.auth

        const response = await detailedFloodService({
            flood_id,
            user_id
        });

        return res.status(httpStatusCodes.OK).send(response);
    } catch (error) {
        return httpErrorHandler({ req, res, error })
    }
}

module.exports = {
    detailedFloodHandler
}

