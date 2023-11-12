const httpStatusCodes = require('http-status-codes')

const { 
    httpErrorHandler 
} = require('../../../common')

const { 
    listFloodService
} = require('../services');

const listFloodHandler = async (req, res, next) => {
    try {
        const {
            latitude,
            longitude,
        } = req.query;

        const {
            user_id
        } = req.auth;

        const response = await listFloodService({
            latitude,
            longitude,
            user_id
        });

        return res.status(httpStatusCodes.OK).send(response);
    } catch (error) {
        return httpErrorHandler({ req, res, error })
    }
}

module.exports = {
    listFloodHandler
}

