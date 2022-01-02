const { Router } = require("express");
const { check,query } = require("express-validator");

const {
  userGet,
  userPost,
  userPut,
  userDelete,
  userpatch,
} = require("../controllers/userController");
const { esRolValido, emailExiste, idExiste } = require("../helpers/db-validators");

const {validarToken,validarRoles,validarCampos}= require('../middleware')

// destructuramos el metodo Router de express para utilizarlo
const router = Router();


// aqui llamo a la funcion del controlador userGet, no la estoy ejecutando sino haciendo una referencia, porque que el req,res se le pasan inplicitamente
router.get("/",[
    query('limit','no es un numero').optional().isNumeric(),
    query('desde','no es un numero').optional().isNumeric(),
    validarCampos
], userGet);
//estos check me van a ir lanzando los errores al validation-result para utilizarlos en el controlados
router.post("/", 
[
    check("name", "el nombre es obligatorio").notEmpty(),
    check("email", "esto no es un email").isEmail(),
    check("email").custom(emailExiste),
    check("password", "el password debe tener mas de 6 digitos").isLength({min:6}),
    //check("role","ese no ese un role permitido").isIn(["ADMIN_ROLE","USER_ROLE"]),//nos valida que el rol sea uno de los que se encuentra en el array
    //la validacion del rol la vamos a hacer congtra la bd
    check('role').custom(esRolValido),
    
    validarCampos

   
],
 userPost);

router.put("/:id",[
    check('id',"no es un id de Mongo").isMongoId(),// el check reconoce tanto los parametros como los body
    check('id').custom(idExiste),
    check('role').custom(esRolValido),

    validarCampos

], userPut);

router.delete("/:id",[
    validarToken,
    // validarRole,
    //como estamos ejecutando una funcion, esta retorna el middleware que se ejecuta aqui,asi es cmo pasamos parametros en un middleware
    validarRoles('ADMIN_ROLE','USER_ROLE','GUESS_ROLE'),
    check('id',"no es un id de Mongo").isMongoId(),// el check reconoce tanto los parametros como los body
    check('id').custom(idExiste),
    validarCampos   
], userDelete);

router.patch("/", userpatch);

module.exports = router;
