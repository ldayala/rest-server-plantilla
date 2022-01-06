const { Router } = require("express");
const { check, param } = require("express-validator");
const {
  crearProducto,
  mostrarProductosPaginados,
  mostrarProductosPorId,
  borrarProducto,
  actualizarProducto
} = require("../controllers/productosController");
const {
  validaCategoria,
  validaId,
  validaNameProducto,
  validaIdProducto,
} = require("../helpers/db-validators");
const { validarCampos, validarToken, validarRole } = require("../middleware");

const router = Router();

router.post(
  "/",
  [
    validarToken,
    check("name", "the name id mandatory").notEmpty(),
    check("precio", "el precio debe ser un numero").optional().isNumeric(),
    check("categoria", "La categoria es obligatoria").notEmpty(),
    check(
      "categoria",
      "El id de la categoria no es un id valido de mongoDb"
    ).isMongoId(),
    check("categoria").custom(validaCategoria),
    check("name").custom(validaNameProducto),
    
    validarCampos,
  ],
  crearProducto
);

router.get(
  "/",
  [
    check("limit", "el limite debe ser un numero").optional().isNumeric(),
    check("desde", "El desde debe ser un numero").optional().isNumeric(),
    validarCampos,
  ],
  mostrarProductosPaginados
);

router.get(
  "/:id",
  [
    param("id")
      .notEmpty()
      .withMessage("el id es obligatorio")
      .isMongoId()
      .withMessage("No es id valido de mongo")
      .custom(validaIdProducto),
    validarCampos,
  ],
  mostrarProductosPorId
);

router.delete(
  "/:id",
  [
    param("id")
      .notEmpty()
      .withMessage("el id es obligatorio")
      .isMongoId()
      .withMessage("No es id valido de mongo")
      .custom(validaIdProducto),
    validarToken,
    validarRole,
    validarCampos,
  ],
  borrarProducto
);

router.put(
  "/:id",
  [
    validarToken,
    validarRole,
    param("id")
      .notEmpty()
      .withMessage("el id es obligatorio")
      .isMongoId()
      .withMessage("No es id valido de mongo")
      .custom(validaIdProducto),
    check("name")
      .optional()
      .isString()
      .withMessage("El name debe ser un string"),
    check("precio")
      .optional()
      .isNumeric()
      .withMessage("el precio debe ser un numero"),
    check("categoria")
      .optional()
      .isMongoId()
      .withMessage("El id de la categoria no es un id valido")
      .custom(validaCategoria),

    validarCampos,
  ],
  actualizarProducto
);
module.exports = router;
