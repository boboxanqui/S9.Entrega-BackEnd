const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next ) => {
     
    // objeto de errores 
    const errors = validationResult( req );
    // Validador si hay errores, retorna 400 y msg de error.
    if( !errors.isEmpty() ){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    // Instrucción para pasar al siguiente middleware (3er parametro)
    next();
}


module.exports = {
    validarCampos
}