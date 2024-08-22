const mongoose = require("mongoose");

function connectToMongoDb(url){
    return mongoose.connect(url )
    .then(()=> {console.log(`mongodb connected `)})
    .catch(err => console.log(`some error : ${err}`));
    
}

module.exports = connectToMongoDb ;