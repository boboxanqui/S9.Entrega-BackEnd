// imports
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

// crea servidor express
const app = express();

// Conexion a base de datos
dbConnection()

//Directorio publico (archivo a mostrar si se renderiza en un navegador)
app.use( express.static('public'))

// CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() )

// Rutas
app.use( '/api/auth', require('./routes/auth') );

// asigna puerto para levantar servidor
app.listen( process.env.PORT, () => {
    console.log(`Servidor levantado en puerto ${ process.env.PORT }`);
})