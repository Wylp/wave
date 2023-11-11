module.exports = Object.freeze({
    ...require('./redis/redis'),
    ...require('./knex/knex'),
    ...require('./http-error-handler/http-error-handler'),
    ...require('./decode-token/decode-token'),
})