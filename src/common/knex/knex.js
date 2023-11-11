'use strict'

const knex = require('knex')({
    client: 'postgres',
    connection: {
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        port: process.env.POSTGRES_PORT,
        password: process.env.POSTGRES_PASS,
        database: process.env.POSTGRES_DB
    }
});

const getTransaction = async ({ db }) => {
    const transaction = await require('knex')({
        client: 'postgres',
        connection: {
            host: process.env.POSTGRES_HOST,
            user: process.env.POSTGRES_USER,
            port: process.env.POSTGRES_PORT,
            password: process.env.POSTGRES_PASS,
            database: db
        }
    }).transaction();

    return { transaction };
}

const getConnection = async () => {
    return {
        connection: knex
    }
}

const commitTransaction = ({ transaction }) => transaction.commit();

const rollbackTransaction = ({ transaction }) => transaction.rollback();

module.exports = { getTransaction, commitTransaction, rollbackTransaction, getConnection };
