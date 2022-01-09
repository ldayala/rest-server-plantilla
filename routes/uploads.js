const { Router } = require("express");
const { check } = require("express-validator");
const { cargarArchivo, updateImg, mostrarImagen, updateImgCloudinary } = require("../controllers");
const { validarColeccion} = require("../helpers");
const { validarArchivo,validarCampos } = require("../middleware");


const router = Router();

router.post("/", [validarArchivo,validarCampos], cargarArchivo);
router.put(
  "/:coleccion/:id",
  [
    check("id").isMongoId().withMessage("no es un id valido de mongo"),
    check("coleccion").custom((c) => validarColeccion(c, ["user", "producto"])),
    validarArchivo,
    validarCampos,
  ],
  updateImgCloudinary
);
router.get(
  "/:coleccion/:id",
  [
    check("id").isMongoId().withMessage("no es un id valido de mongo"),
    check("coleccion").custom((c) => validarColeccion(c, ["user", "producto"])),
    validarCampos,
  ],
  mostrarImagen
);
module.exports = router;
