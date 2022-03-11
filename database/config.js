const mongoose = require("mongoose");

const dbConnection = async() => {

    try{
        await mongoose.connect( process.env.BD_CNN );

        console.log('BD online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar Base Datos')
    }


}


module.exports = {
    dbConnection
}