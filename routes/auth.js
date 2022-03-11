// importaciones
const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

// Objeto router para crear las rutas
const router = Router();


// Crear un nuevo usuario
router.post( '/new',[
    //Validaciones middleware
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El passwoerd es obligatorio').isLength({ min: 6 }),
    validarCampos

] , crearUsuario)

// Login de usuario
router.post( '/',[
    //Validaciones middleware
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({ min: 6 }),
    validarCampos

] , loginUsuario)

// Validar token
router.get( '/renew',validarJWT , revalidarToken )



// exportacion

module.exports = router