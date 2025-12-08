const mongoose = require('mongoose');

const connectionString = process.env.DATABASE_URL;

mongoose.connect(connectionString).then((res) =>{
    console.log("Atlas Database Connected Successfully");
}).catch((err) => {
    console.log("Atlas Database Connection Failed!", err);
})