const ErrorResponse = require("./errorResponse");

/*
OPTIONS OBJECT 
{
    condition: {},
    populate: [true,'field_name'],
    page: req.query.page,
    limit: req.query.limit
}
*/

async function paginatedResults(model, options) {

        const page = parseInt(options.page);
        const limit = parseInt(options.limit);
   
        const startIndex = ( page - 1 ) * limit;
        const endIndex = page * limit;

        const result = {}

        if(endIndex < await model.countDocuments(options.condition).exec()) {
            result.next = {
                page: page + 1,
                limit: limit
            }
        }

        if(startIndex > 0) {
            result.previous = {
                page: page - 1,
                limit: limit
            }
        }
        try{
            if(options.populate[0]){
                result.results = await model.find(options.condition).limit(limit).skip(startIndex).populate(options.populate[1]).exec();
            }
            else{
                result.results = await model.find(options.condition).limit(limit).skip(startIndex).exec();
            }
            
            return result;
        }

        catch(err){
            throw err;
        }
}

module.exports = paginatedResults;