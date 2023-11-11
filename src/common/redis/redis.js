'use strict';
const redis = require("redis");

const client = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
}).on("error", (error) => {
    console.error(`[error] on redis: ${error}`);
})

client.connect();

const redis_native = {
    redis_get: client.get.bind(client),
    redis_set: client.set.bind(client),
    redis_keys: client.keys.bind(client),
    redis_del: client.del.bind(client),
    client_redis: client,
}

const del_by_key_pattern = async (key_pattern) => {
    const all_keys = await redis_native.redis_keys(key_pattern)
    const has_keys = Array.isArray(all_keys) && all_keys.length > 0
    if(has_keys) {
        await redis_native.redis_del(all_keys)
    }
}

module.exports = {
    ...redis_native,
    del_by_key_pattern
}