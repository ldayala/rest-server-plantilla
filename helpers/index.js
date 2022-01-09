const dbValidator= require('./db-validators');
const generarJWT=require('./generar-jwt')
const verificarTGoo= require('./verifica-token-google');
const subirArchivos=require('./subir-archivo')
const validarModelo=require('./validar-modelo')
const mostrarImgPorDefecto=require('./mostrar-img-porDefecto')
module.exports={
    ...dbValidator,
    ...generarJWT,
    ...verificarTGoo,
    ...subirArchivos,
    ...validarModelo,
    ...mostrarImgPorDefecto
}