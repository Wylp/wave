const httpStatusCodes = require('http-status-codes')

const { 
    httpErrorHandler 
} = require('../../../common')

const { 
    updateFloodService
} = require('../services');

const updateFloodHandler = async (req, res, next) => {
    try {
        const {
            user_location,
            date_time,
            water_level,
            description,
            status
        } = req.body;

        const {
            flood_id
        } = req.query

        const {
            user_id,
            is_admin
        } = req.auth

        await updateFloodService({
            user_location,
            date_time,
            water_level,
            description,
            status,
            user_id,
            is_admin,
            flood_id
        });

        return res.status(httpStatusCodes.OK).send({ flood_id });
    } catch (error) {
        return httpErrorHandler({ req, res, error })
    }
}

module.exports = {
    updateFloodHandler
}

