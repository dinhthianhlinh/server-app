const mongoose = require('mongoose');

const local = "mongodb+srv://weddingstudio:GBRNXdElXCQGV168@database.hjknw7l.mongodb.net/"

const connect = async () => {
    try {
        await mongoose.connect(local, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to the database');
    } catch (error) {
        console.log('Error connecting to the database');
        console.log(error);

    }
}
module.exports = connect;
