const { isValidObjectId } = require("mongoose");
const { ObjectId } = require("mongoose").Types;
const {
  UserModel,
  CategoriaModel,
  ProductoModel,
  RoleModel,
} = require("../models");

const coleccionesPermitidas = ["usuarios", "categoria", "productos", "roles"];
const regex = (termino) => new RegExp(termino, "i");

const buscarUsuarios = async (termino = "", res) => {
  try {
    if (isValidObjectId(termino)) {
      const usuario = await UserModel.findById(termino);
      return res.json({
        results: usuario ? usuario : [],
      });
    }
    //hacemos una busqueda insensible, es decir que cualquier cosa que coincida con la palabra

    const usuarios = await UserModel.find({
      $or: [{ name: regex(termino) }, { email: regex(termino) }],
      $and: [{ estado: true }],
    });

    return res.json({
      results: usuarios ? usuarios : [],
    });
  } catch (error) {
    res.status(500).json('Lo siento .... Error interno del servidor')
  }
};

const buscarCategoria = async (termino, res) => {
  try {
    const categoria = await CategoriaModel.find({
      $and: [{ name: regex(termino) }, { estado: true }],
    });
    res.json({
      results: categoria ? categoria : [],
    });
  } catch (error) {
    res.status(500).json('Lo siento .... Error interno del servidor')
  }
};

const buscarProductos = async (termino, res) => {
  try {
    if (!isNaN(termino)) {
      const productos = await ProductoModel.find({
        $and: [{ precio: { $lt: termino } }, { disponible: true }],
      });
      return res.json({
        results: productos ? productos : [],
      });
    }

    const productos = await ProductoModel.find({
      $or: [{ name: regex(termino) }, { descripcion: regex(termino) }],
      $and: [{ disponible: true }],
    });

    return res.json({
      results: productos ? productos : productos,
    });
  } catch (error) {
    res.status(500).json('Lo siento .... Error interno del servidor')
  }
};

const buscarRoles = async (termino, res) => {
  try {
    const roles = await RoleModel.find({
      role: regex(termino),
    });
  } catch (error) {
    res.status(500).json('Lo siento .... Error interno del servidor')
  }
};


const buscar = async (req, res) => {
  try {
    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
      return res.status(400).json({
        msj: `Las colecciones permitidas son ${coleccionesPermitidas}`,
      });
    }
    switch (coleccion) {
      case "usuarios":
        await buscarUsuarios(termino, res);
        break;
      case "categoria":
        await buscarCategoria(termino, res);
        break;
      case "productos":
        await buscarProductos(termino, res);
        break;
      case "roles":
        await buscarRoles(termino, res);
        break;
    }
  } catch (error) {
    res.status(500).json({
      errs: error.message,
    });
  }
};

module.exports = { buscar };
