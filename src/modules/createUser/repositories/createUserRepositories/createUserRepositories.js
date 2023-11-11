const { v4 } = require('uuid');
const {
    getTransaction, rollbackTransaction, commitTransaction
} = require('../../../../common')

const createUserRepositories = async ({
    firstName,
    lastName,
    username,
    email,
    password
}) => {

    const {
        transaction
    } = await getTransaction({
        db: process.env.POSTGRES_DB
    });

    try {

        await transaction("users").insert({
            user_id: v4(),
            first_name: firstName,
            last_name: lastName,
            username: username,
            user_email: email,
            password_encrypted: password
        })

        await commitTransaction({ transaction })

    }catch(err){
        rollbackTransaction({ transaction })
        console.error(err)
        throw err;
    }
}

module.exports = {
    createUserRepositories
}