const { Schema, model } = require("mongoose");

const categoriaSchema = Schema({
  name: {
    type: String,
    required: [true, "the name is mandatory"],
    unique: true,
  },
  estado: {
    type: Boolean,
    requered: [true, "the estado is mandatory"],
    default: true,
  },
  usuario: {
    // el usuario que creo la categoria
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});
categoriaSchema.methods.toJSON = function () {
  const { __v, estado, ...categoria } = this.toObject();
  delete categoria.usuario._id;
  delete categoria.usuario._id;
  return categoria;
};
module.exports = model("Categoria", categoriaSchema);
