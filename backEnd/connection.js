const mongoose = require("mongoose");

async function connectMDB(connectionString) {
    await mongoose.connect(connectionString)
    .then(()=>console.log("MongoDB Connected _ _ _ "));
}

module.exports = {
    connectMDB
}