const Role = require("../models/role");
const User=require('../models/userModel')

const esRolValido = async (role = "") => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist) {
    throw new Error("ese rol no existe en la bd");
  }
};

const emailExiste= async (email="")=>{
    console.log("email",email);
    const emailexis=await User.findOne({email})
    console.log("existe email:",emailexis);
    if (emailexis) {
        throw new Error("ese email ya esta en uso");
      }
}

const idExiste= async (id)=>{

  const idExist= await User.findById(id);
  if(!idExist){
    throw new Error("no existe un user con ese id")
  }
}
module.exports = {
  esRolValido,
  emailExiste,
  idExiste
};
