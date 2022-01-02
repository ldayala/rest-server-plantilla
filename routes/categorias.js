const { check, query, param, body } = require("express-validator");
const { Router } = require("express");
const { validarCampos, validarToken, validarRole } = require("../middleware");
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoriaPorId,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers");
const { validaId } = require("../helpers/db-validators");

const router = Router();

//Crear categoria - privado -  cualquier persona con token valido
router.post(
  "/",
  [
    check("name", "the name is mandatory").notEmpty(),
    check("name", "the name debe ser un string").isString(),
    validarToken,
    validarCampos,
  ],
  crearCategoria
);

//obtener todas las categorias - publico
router.get(
  "/",
  [
    query("limit", "el limite debe ser un numero").optional().isNumeric(),
    query("desde", "el desde debe ser un numero").optional().isNumeric(),
    validarCampos,
  ],
  obtenerCategorias
);

//obtener categoria por id - publico ..... {categoria}-populate
router.get(
  "/:id",
  [
    check('id','El id no es un id validos de MongoDb').isMongoId(),
    check("id").custom(validaId),
    validarCampos,
  ],
  obtenerCategoriaPorId
);

//Actualizar categoria - privado - cualquier persona con token valido
router.put(
  "/:name",
  [
    param("name", "el name es obligatorio").notEmpty(),
    check("name", "el name debe ser un string").isString(),
    body("name", "el nameNuevo es obligatorio").notEmpty(),
    check("name", "el nameVuevo debe ser un string").isString(),
    validarToken,
    validarCampos,
  ],
  actualizarCategoria
);

//Borrar una categoria - ADMIN_ROLE
router.delete(
  "/:id",
  [
    check("id", "No es un id valido para mongo").isMongoId(),
    check('id').custom(validaId),
    validarToken,
    validarRole,
    validarCampos,
  ],
  borrarCategoria
);
module.exports = router;
