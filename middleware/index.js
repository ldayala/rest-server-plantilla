//las constantes va a tener toodo lo que tienen los archivos
const validarToken = require("../middleware/validar-jwt");
const validarRol = require("../middleware/validar-roles");
const validarCampos = require("../middleware/validarCampos");
const validarArchivo = require("./validarArchivo");
//exportamos un objeto donde van a estar todos los metodos exportados en las constante  creadas
module.exports = {
  ...validarToken,
  ...validarRol,
  ...validarCampos,
  ...validarArchivo,
};
