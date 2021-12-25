const { request, response } = require("express");
const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const bcrypt = require("bcryptjs/dist/bcrypt");
const { generarToken } = require("../helpers/generar-jwt");

const authLogin = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;
    //verificar si el usuario existe
    const user = await User.findOne({ email });
    
    if (!user)
      return res.status(400).json({
        msj: "Usuario / Password no es correcto- email",
      });
    //verificas si el usuario esta activo
    if (user.estado === false)
      return res.status(400).json({
        msj: "su user esta desactivado",
      });
    //verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);// hace match y devuelve true si coinciden las contraseñas
    if (!validPassword)
      return res.status(400).json({
        msj: "su password no es correcto",
      });

    //generar el JWT

    const token= await generarToken(user.id);

    return res.json({
        user,
        token
    })

    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msj: "ha ocurrido un error en el servidor",
    });
  }
};

module.exports = {
  authLogin,
};
