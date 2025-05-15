const mongoose = require('mongoose');
const url = 'mongodb+srv://armando:A3bc5e2104@cluster0.mwyw3in.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

class Connection {
    
   async connection () {
        try {
            console.log(url);
            const conectado = await mongoose.connect( url, {
                dbName: 'sample_mflix'
            });
            console.log(conectado.connection.readyState);
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = new Connection();