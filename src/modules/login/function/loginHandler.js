const httpStatusCodes = require('http-status-codes')

const { 
    httpErrorHandler 
} = require('../../../common')

const { 
    loginService
} = require('../services');

const loginHandler = async (req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body;

        const {
            token
        } = await loginService({
            email,
            password
        });

        return res.status(httpStatusCodes.OK).send({
            token
        });
    } catch (error) {
        return httpErrorHandler({ req, res, error })
    }
}

module.exports = {
    loginHandler
}