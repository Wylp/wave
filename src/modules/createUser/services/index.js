module.exports = Object.freeze({
    ...require("./createUserService/createUserService"),
    ...require("./verifyAlreadyUserByEmail/verifyAlreadyUserByEmail")
})