const { CategoriaModel, ProductoModel } = require("../models");
const Role = require("../models/roleModel");
const User = require("../models/userModel");

const esRolValido = async (role = "") => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist) {
    throw new Error("ese rol no existe en la bd");
  }
};

const emailExiste = async (email = "") => {
  console.log("email", email);
  const emailexis = await User.findOne({ email });
  console.log("existe email:", emailexis);
  if (emailexis) {
    throw new Error("ese email ya esta en uso");
  }
};

const idExiste = async (id) => {
  const idExist = await User.findById(id);
  if (!idExist) {
    throw new Error("no existe un user con ese id");
  }
};

const validaId = async (id = null) => {
  if (!id) {
    throw new Error("el id es obligatorio");
  }
  const categoriaDb = await CategoriaModel.findById(id);
  if (!categoriaDb)
    throw new Error("En la DB no exite ninguna categoria con es id");
};

const validaCategoria = async (categoria = null) => {
  const existe = await CategoriaModel.findById(categoria);

  if (!existe) {
    throw new Error("la categoria no existe en la DB");
  } else {
    if (existe.estado === false)
      throw new Error(
        `la categoría con id: ${categoria} ha sido eliminada de la bd con anterioridad`
      );
  }
};

const validaNameProducto = async (name) => {
  name=name.toLowerCase()
  const existe = await ProductoModel.findOne({ name });
  if (existe) throw new Error("ya existe un producto con ese nombre");
};

const validaIdProducto = async (id = null) => {
  if (!id) {
    throw new Error("el id es obligatorio");
  }
  const productoDb = await ProductoModel.findById(id);
  if (!productoDb) throw new Error("En la DB no exite un producto con es id");
  if (productoDb.estado === false)
    throw new Error("Ese producto ha sido eliminado de la base de datos");
};

/**
 * validar que las coleccion este dentro la colecciones permitidas
 */
const validarColeccion=(c='',coleccionesPermitidas=[])=>{
  if(!coleccionesPermitidas.includes(c)){
    throw new Error(`${c} no es un colleccion permitida`)
  }
  return true
}
 


module.exports = {
  esRolValido,
  emailExiste,
  idExiste,
  validaId,
  validaCategoria,
  validaNameProducto,
  validaIdProducto,
  validarColeccion,

};
