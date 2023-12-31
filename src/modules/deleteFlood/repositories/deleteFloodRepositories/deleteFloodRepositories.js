const deleteFloodRepositories = async ({
    flood_id,
    status,
    transaction
}) => {
    try {

        await transaction("floods").update({
            status,
            update_at: new Date()
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