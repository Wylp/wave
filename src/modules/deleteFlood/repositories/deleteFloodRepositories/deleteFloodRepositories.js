const deleteFloodRepositories = async ({
    flood_id,
    status,
    transaction
}) => {
    try {

        await transaction("floods").update({
            status
        }).where({
            flood_id
        })
        
    }catch(err){
        console.error(err)
        throw err;
    }
}

module.exports = {
    deleteFloodRepositories
}