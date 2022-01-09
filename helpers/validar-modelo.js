const { UserModel, ProductoModel } = require("../models");

const validarModelo=async(coleccion,id)=>{
    let modelo;
    switch (coleccion) {
        case "user":
          modelo = await UserModel.findById(id);
          if (!modelo) {
            return res.status(400).json({
              msj: `Update Imagen: no existe un user con el id: ${id}`,
            });
          }
  
          break;
        case "producto":
          modelo = await ProductoModel.findById(id);
          if (!modelo) {
            return res.status(400).json({
              msj: `Update Imagen: no existe un producto con el id: ${id}`,
            });
          }
  
          break;
  
        default:
          return res.status(400).json("esa coleccion no es permitida");
      }
      return modelo
}

module.exports={
    validarModelo
}