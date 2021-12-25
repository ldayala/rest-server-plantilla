const {Router}=require('express')
const{check}=require('express-validator');
const { authLogin } = require('../controllers/authController');
const { validarCampos } = require('../middleware/validarCampos');

const router=Router()

router.post('/login',[
    check('email',"El email es obligatorio").notEmpty(),
    check('email','no es un email valido').isEmail(),
    check('password','el password es obligatorio').notEmpty(),
    validarCampos

],authLogin)
module.exports= router;