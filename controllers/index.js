const UserController=require('./userController')
const CategoriaController=require('./categoriaController')
const AuthController=require('./authController')
const ProductosController=require('./productosController')
const BuscarController= require('./buscarController')

module.exports={
    ...UserController,
    ...CategoriaController,
    ...AuthController,
    ...ProductosController,
    ...BuscarController
}