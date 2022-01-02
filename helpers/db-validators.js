const { CategoriaModel } = require("../models");
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



module.exports = {
  esRolValido,
  emailExiste,
  idExiste,
  validaId,
};
