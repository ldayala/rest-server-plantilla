const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { generarToken } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/verifica-token-google");

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
    const validPassword = bcryptjs.compareSync(password, user.password); // hace match y devuelve true si coinciden las contraseñas
    if (!validPassword)
      return res.status(400).json({
        msj: "su password no es correcto",
      });

    //generar el JWT

    const token = await generarToken(user.id);

    return res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msj: "ha ocurrido un error en el servidor",
    });
  }
};

const authLoginGoogle = async (req, res) => {
  try {
    const { id_token } = req.body;
    const { name, email, img } = await googleVerify(id_token);
    let usuario = await User.findOne({ email }); //verifico si el user se encuentra en la DB

    if (!usuario) {
      //como el user no existe tengo que crearlo
      let data = {
        name,
        email,
        img,
        password: ":P",
        google: true,
      };
      usuario = new User(data);
    await  usuario.save();
    }
    //TODO: SI EL USUARIO ESTA EN DB Y EL ESTADO EST EN TRUE LO PODEMOS ACTUALIZAR O LO QUE SEA

    //SI EL USER SE ENCUENTRA EN LA DB Y EL ESTADO ESTA EN FALSE( ESTA BLOQUEDAO POR TANTO NO SE PUEDE )
    console.log("usuario:", usuario);
    if (!usuario.estado) {
      return res.status(401).json({
        msj: "Hable con el administrador User - Bloqueado",
      });
    }

    //generar el token
    const token= await generarToken(usuario._id)
   console.log("token:",token);
    return res.json({
      usuario,
      token
    });
  } catch (error) {
    console.warn("error", error);
    res.status(500).json({
      msg: error,
    });
  }
};
module.exports = {
  authLogin,
  authLoginGoogle,
};
