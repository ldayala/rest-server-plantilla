const UserController=require('./userController')
const CategoriaController=require('./categoriaController')
const AuthController=require('./authController')

module.exports={
    ...UserController,
    ...CategoriaController,
    ...AuthController
}