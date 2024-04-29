const mongoose = require('mongoose');

const Connection = async (username = 'googledocs', password = 'miniproject') => {
    const URL = `mongodb+srv://${username}:${password}@google-docs-clone.cgwpvza.mongodb.net/?retryWrites=true&w=majority&appName=google-docs-clone`;

    try {
        await mongoose.connect(URL);
        console.log('Database connected successfully');
    } catch (err) {
        console.error('Error while connecting with the database ', err);
    }
}

module.exports = Connection;
