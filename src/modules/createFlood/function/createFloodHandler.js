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
            floodLocation,
            userLocation,
            dateTime,
            waterLevel,
            description,
            attachments
        } = req.body;

        const {
            user_id
        } = req.auth

        const {
            flood_id
        } = await createFloodService({
            floodLocation,
            userLocation,
            dateTime,
            waterLevel,
            description,
            attachments,
            user_id
        });

        return res.status(httpStatusCodes.OK).send({ flood_id });
    } catch (error) {
        return httpErrorHandler({ req, res, error })
    }
}

module.exports = {
    createFloodHandler
}

