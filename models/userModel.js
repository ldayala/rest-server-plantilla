const { Schema, model } = require("mongoose");

const userSchema = Schema({
  name: {
    type: String,
    required: [true, "the name is mandatory"],
  },
  email: {
    type: String,
    required: [true, "the email is mandatory"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, " The password is mandatory"],
  },
  img: String,
  role: {
    type: String,
    required: true,
    default: "USER_ROLE",
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  estado: {
    // cuando creamos un user lo ponemos por defecto en activo, y si si lo eliminamos lo que hacemos es que los ponemos en false
    type: Boolean,
    default: true,
  },
  google: {
    // si es user fue creado por google/ if the user was created by google
    type: Boolean,
    default: false,
  },
});
// esto lo utilizamos para sobreescribir los metodos del esquema, en este caso es para que en la respuesta no muestre el password y el _v
userSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
   return user;
};
module.exports = model("user", userSchema); // el primer parametro es el nombre que va a tenr la tablae en la bd, mongo le agrega una s
