module.exports = Object.freeze({
    ...require("./getDetailedFloodRepositories/getDetailedFloodRepositories"),
    ...require("./getUserContributionRepositories/getUserContributionRepositories"),
    ...require("./updateFloodRepositories/updateFloodRepositories"),
    ...require("./updateUserContributionRepositories/updateUserContributionRepositories"),
    ...require("./createUserContributionsRepositories/createUserContributionsRepositories"),
})