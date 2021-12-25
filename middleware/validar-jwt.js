
const { response, request } = require('express');
const jwt=require('jsonwebtoken');
const UserModel = require('../models/userModel');

const validarToken=async(req=request,res=response,next)=>{
    const token= req.header('x-token')
    if(!token) return res.status(401).send({// 401 - no autorizado
        msj:'debe enviar el token'
    })

    try {
        // esta funcion me verifica si el token es valido
        //decir payload = verify pues obtenermos los datos que vieene en el payload del token
      const payload=  jwt.verify(token,process.env.SECRETOPRIVATEKEY)
      const{uid}=payload;
      //aqui le estamos asignando al req un parametro uid para poder acceder a ellos desde los controladores y rutas ya que es lo que nos interesa del jwt
     //req.user=await UserModel.findById(uid)

     //leer el usuario que corresponde al uid
     const  usuarioAutenticado=await UserModel.findById(uid)
      //verificamos que el ususario autenticado sea valido o no este el estado el false
      if(!usuarioAutenticado){
        res.status(401).json({
            msg:'token no valido- usuario no existe en DB'
        })
    }
     //verificamos que el ususario autenticado sea valido o no este el estado el false
     if(!usuarioAutenticado.estado){
         res.status(401).json({
             msg:'token no valido- usuario inactivo'
         })
     }
        req.usuarioAutenticado= usuarioAutenticado
        next()
    } catch (error) {
        console.log(error);
        return  res.status(401).send({// 401 - no autorizado
            msj:'el token enviado no es valido',
            err:error
        })
    }
    

}
module.exports={
    validarToken
}