const httpStatusCodes = require('http-status-codes')

const { 
    httpErrorHandler 
} = require('../../../common')

const { 
    deleteFloodService
} = require('../services');

const deleteFloodHandler = async (req, res, next) => {
    try {
        const {
            flood_id
        } = req.query;

        const {
            user_id,
            is_admin
        } = req.auth

        if(is_admin !== true) {
            throw {
                statusCode: httpStatusCodes.FORBIDDEN,
                message: "You are not allowed to delete a flood"
            }
        }
        
        await deleteFloodService({
            flood_id
        });

        return res.status(httpStatusCodes.OK).send();
    } catch (error) {
        return httpErrorHandler({ req, res, error })
    }
}

module.exports = {
    deleteFloodHandler
}

