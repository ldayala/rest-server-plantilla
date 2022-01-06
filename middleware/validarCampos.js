const { validationResult } = require("express-validator");


const validarCampos=(req,res,next)=>{// los middleware van a ser llamados tambien con la req,res
 // el validationResult contienen los errores las lanzados por el check del express-validator usado como middleware en las ruta
 const errors = validationResult(req); // el
 
 if (!errors.isEmpty()) {
   return res.status(400).json({
     msg: errors,
   });
 }
 
 next(); // esto nos dice que si llego hasta aqui siga con el siguiente middleware y cuando no halla mas al controlador
}

module.exports={
    validarCampos
}