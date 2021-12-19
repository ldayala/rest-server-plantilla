//esto lo hacemos para separ la logica de lo archivos routes y quede el codigo mejor estructurado y limpio

const bcryptjs = require("bcryptjs");
const { request, response } = require("express"); // esto lo hacemos porque al estar aca no nos reconoce el res, y nos nos autocompleta el codigo

const User = require("../models/userModel");

const userGet = async (req = request, res = response) => {
    // vamos a mostrar los usuarios paginados
    const {limit=5,desde=0}=req.query
   /* const userTotal= await User.countDocuments()
   const usuarios= await User.find({estado:true})// con el estado: true porque los false son los user eliminados
        .skip(Number(desde))
        .limit(Number(limit))// tenemos qu convertir el limite a number para que funcione la funcion ya que al venir de la url es un string
     */ 
    const query={estado:true}  
    const [userTotal, usuarios]= await Promise.all([
       User.countDocuments(query),
       User.find(query)// con el estado: true porque los false son los user eliminados
      .skip(Number(desde))
      .limit(Number(limit))])
  res.json({
    userTotal,
    usuarios});
};

const userPost = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  //verificar si el correo existe, esto esta comentado porque ya lo hacemos con el expres validator
  //   const existe = await User.findOne({ email }); // busca si en la coleccion hay un user con el mismo correo
  //   if (existe)
  //     return res.status(400).json({ msg: "ese correo ya esta registrado" });
  //encriptar la contraseña
  const salt = bcryptjs.genSaltSync(); //para generear la sal por defecto tiene 10 si queisieramos que fuera mas alta le pasamos el numero en la funcion
  user.password = bcryptjs.hashSync(password, salt);
  // guardar en la bd
  await user.save();
  res.json({
    message: "post Api  - controller",
    user,
  });
};

const userDelete = async(req, res = response) => {
// en este caso la eliminacion consite en actualizar a false es estado
   const {id}= req.params
    const userElimin= await User.findByIdAndUpdate(id,{estado:false})
  res.json(userElimin);
};

const userPut = async (req, res = response) => {
  const { id } = req.params;
  //aqui quitamos el _id para que el update no explote
  const { _id, password, google, email, ...resto } = req.body;
  const user = new User({});

  if (password) {
    // si viene el password  significa que tambien quiere actualizar la contraseña
    const salt = bcryptjs.genSaltSync(); //para generear la sal por defecto tiene 10 si queisieramos que fuera mas alta le pasamos el numero en la funcion
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const userUpdate = await User.findByIdAndUpdate(id, resto);

  res.json(userUpdate);
};

const userpatch = (req, res = response) => {
  res.json({
    message: "patch Api  - controller",
  });
};

module.exports = {
  userGet,
  userPost,
  userDelete,
  userpatch,
  userPut,
};
