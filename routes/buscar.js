const { Router } = require("express");
const { check } = require("express-validator");
const { buscar } = require("../controllers");
const { validarCampos } = require("../middleware");

const router = Router();

router.get(
  "/:coleccion/:termino",
  [
    check("coleccion")
      .isString()
      .withMessage("La coleccion debe ser un string"),
    validarCampos,
  ],
  buscar
);

module.exports = router;
