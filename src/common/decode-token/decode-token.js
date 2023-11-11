const jwt = require('jsonwebtoken');

const paths_without_token = [
    '/api/v1/create-user',
    '/api/v1/login',
];

const decodeToken = () => {
    return (req, res, next) => {

        if (paths_without_token.includes(req.originalUrl)) {
            return next();
        }

        const {
            'jwt-auth-key': token
        } = req.headers;

        try {
            const remove_bearer_regex = /^Bearer/g;

            const bearer_token = (token || '').replace(remove_bearer_regex, '').trim();

            const token_payload = jwt.verify(bearer_token, process.env.TOKEN_SECRET);

            req.auth = token_payload;

        } catch (err) {
            return res.status(401).send({ response: 'Unauthorized', })
        }
        next();
    }
}
module.exports = {
    decodeToken
}
