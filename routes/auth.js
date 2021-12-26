const { Router } = require("express");
const { check } = require("express-validator");
const { authLogin, authLoginGoogle } = require("../controllers/authController");
const { validarCampos } = require("../middleware/validarCampos");

const router = Router();

router.post(
  "/login",
  [
    check("email", "El email es obligatorio").notEmpty(),
    check("email", "no es un email valido").isEmail(),
    check("password", "el password es obligatorio").notEmpty(),
    validarCampos,
  ],
  authLogin
);
//la autenticacion a traves de google
router.post(
  "/google",
  [check("id_token", "El token es obligatorio").notEmpty(), validarCampos],
  authLoginGoogle
);
module.exports = router;
