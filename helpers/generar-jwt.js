const jwt= require('jsonwebtoken');

const generarToken= (uid)=>{//uid=> identificador unico de usuario
    //hago esto para retornar una promesa y asi poder trabajar con el async  y await ya que este paquete no tien soporte para promesas
    return new Promise((resolve,reject)=>{

        const payload= {uid} //grabo los datos en el payload
        jwt.sign(payload,process.env.SECRETOPRIVATEKEY,{
            //aqui le pasamos la opciones
            expiresIn:'10d'
        },(err,token)=>{
            if(err){
                console.log(err);
                reject("no se pudo generar el token")
            }
            else{
                resolve(token)
            }
        })//sign: para firmar un nuevo token(payload, secret)

    })
}

module.exports={generarToken}
