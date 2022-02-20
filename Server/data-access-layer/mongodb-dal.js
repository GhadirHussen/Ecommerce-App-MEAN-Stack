const mongoose = require("mongoose");

function connectAsync() {
    return new Promise((resolve, reject) => {

        // Connect options - prevent console warnings:
        const options = { useNewUrlParser: true, useUnifiedTopology: true };

        // Connect to MongoDB:
        mongoose.connect(config.mongodb.connectionString, options, (err, db) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(db);
        });
    });
}

connectAsync()
    .then(db => console.log("We're connected to MongoDB."))
    .catch(err => console.log(err));


////===========================================================================

//another way to connect with mongoos 

// mongoose.connect(config.mongodb.connectionString , err => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("We're connected to MongoDB.");
//     }
// })