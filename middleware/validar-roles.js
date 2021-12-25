const { response } = require("express");

const validarRole = (req, res=respose , next) => {
  //comprobamos que exista el usuario
 if(!req.usuarioAutenticado) return res.status(500).json({
     msj:"error interno del servidor"
 })

 const {role,name} =req.usuarioAutenticado
  if (role !== 'ADMIN_ROLE') {
   return  res.status(401).json({
      msj: "Necesita privilegios de administrador",
    });
  }

  next();
};

const validarRoles=(...roles)=>{
    return (req,res,next)=>{ //esta funcion que retornamos es la que se va a ejecutar en el middleware

        if(!req.usuarioAutenticado) return res.status(500).json({
            msj:"error interno del servidor"
        })
       
        const {role} =req.usuarioAutenticado
         if (!roles.includes(role)) {
          return  res.status(401).json({
             msj: `el servicio requiere uno de estos roles - ( ${roles} )`,
           });
         }
       
        next()
    }
}

module.exports = {
  validarRole,
  validarRoles
};
