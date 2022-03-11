const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


// Get callback
const crearUsuario = async(req, res = response ) => {

    // Desestructuración de la solicitud
    const { email, name, password } = req.body;

    try {

        // Verificar email 
        const usuario = await Usuario.findOne({ email })
        if( usuario){
            return res.status(400).json({
                ok: false,
                msg: "Usuario ya existe"
            })
        }

        // Crear usuario con el modelo
        const dbUser = new Usuario( req.body );

        // Crear hash del password para encriptarla
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync( password, salt )

        // Generar el JWT (Json Web Token)
        const token = await generarJWT( dbUser.id, name );

        // Guardar usuario en Base Datos
        await dbUser.save();

        // Respuesta satisfactoria
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            token
        })
   
    } catch (error) {
        console.log(error);
        // Respuesta si hay algun error en la validación contra BD
        return res.status(500).json({
            ok: false,
            msg: 'Error en el registro del email'
        })  
    }
}

const loginUsuario = async (req, res = response ) => {


    // Desestructuración de la solicitud
    const { email, password } = req.body;

    try {

        // Valida que el email se ha registrado
        const dbUser = await Usuario.findOne({ email });

        if( !dbUser ){
            return res.status(400).json({
                ok: false,
                msg: 'Email  no existen'
            })
        }

        // Valida la coincidencia del password

        const validPassword = bcrypt.compareSync( password, dbUser.password );

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: ' password no existen'
            })
        }

        // Generar el JWT (Json Web Token)
        const token = await generarJWT( dbUser.id, dbUser.name );


        // Generar respuesta satisfactoria
        return res.json({
            ok: true,
            msg: 'Login OK',
            uid: dbUser.id,
            name: dbUser.name,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            msg: 'Error al iniciar sesion'
        })
    }

}

const revalidarToken = async (req, res = response ) => {

    const { uid, name } = req;

    // Generar el JWT (Json Web Token)
    const token = await generarJWT( uid, name );


    // Respuesta si middlewares pasan
    return res.json({
        ok: true,
        uid,
        name,
        token
    })
}


// exportacion
module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}