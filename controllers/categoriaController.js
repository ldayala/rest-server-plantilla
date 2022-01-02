const { response, request } = require("express");
const { CategoriaModel } = require("../models");
const { findOneAndUpdate } = require("../models/categoriaModel");
const categoriaModel = require("../models/categoriaModel");

const crearCategoria = async (req = request, res = response) => {
  try {
    const name = req.body.name;

    const categoriaExiste = await CategoriaModel.findOne({ name });
    if (categoriaExiste)
      return res.status(400).json({
        msj: `La categoría ${name} ya existe en la bd`,
      });

    //Generar la data a grabar

    const data = {
      name,
      usuario: req.usuarioAutenticado._id,
    };
    console.log(" esta es la data desde categoria", data);
    const categoria = new CategoriaModel(data);
    await categoria.save();

    return res.status(201).json({
      msj: "categoria creada",
    });
  } catch (error) {
    return res.status(500).json({
      msj: error,
    });
  }
};

//obtener todas las categorias - publico ..... paginado-total-populate (para mostrar el nombre de quien lo creo)

const obtenerCategorias = async (req, res) => {
  try {
    const { limit = 5, desde = 0 } = req.query;
    const query = { estado: true };
    const [categoriaTotal, categoria] = await Promise.all([
      CategoriaModel.countDocuments(query),
      CategoriaModel.find({ estado: true })
        .skip(Number(desde))
        .limit(Number(limit))
        .populate({ path: "usuario", select: "name" })
        ,
    ]);

    return res.json({ categoria, categoriaTotal });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({
      err: error,
    });
  }
};
//obtener categoria por id - publico ..... {categoria}-populate
const obtenerCategoriaPorId = async (req = request, res) => {
  try {
    const { id } = req.params;
    const categoria = await CategoriaModel.findById(id).populate({
      path: "usuario",
      select: "name",
    });
    if (!categoria)
      return res.status(400).json({
        msj: "esa categoria no existe",
      });

    if (!categoria.estado)
      return res.status(400).json({
        msj: "esa categoria no esta activa",
      });

    return res.json({ categoria });
  } catch (error) {}
};

//Actualizar categoria(name) - privado - cualquier persona con token valido

const actualizarCategoria = async (req, res) => {
  try {
    /*const { name } = req.params;
    let { nameNuevo } = req.body;
    nameNuevo=nameNuevo.toLowerCase()
    const filter = { name };
    const update = { name: nameNuevo };
    const categoria = await CategoriaModel.findOne(filter);
*/

const{name}= req.params;
const{estado,usuario,...data}=req.body;

data.name=data.name.toLowerCase();
data.usuario=req.usuarioAutenticado._id;
const filter={name};
const update=data;

const categoria = await CategoriaModel.findOne(filter);

    if (!categoria) {
      return res.status(400).json({
        msj: `La categoria ${name} no se encuentra en la bd`,
      });
    }
    //const categoriaAct = await CategoriaModel.updateOne(filter,update)
    const categoriaAct = await CategoriaModel.findOneAndUpdate(filter, update, {
      new: true,
    });

    return res.json({ categoriaAct });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//Borrar una categoria(id) estado:false - ADMIN_ROLE

const borrarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await CategoriaModel.findById(id);
    if (!categoria)
      return res.status(400).json({
        msj: "Esa categoria no existe en la DB",
      });

    categoria.estado = false;
    await categoria.save();
    return res.json({
      msj: "ok",
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoriaPorId,
  actualizarCategoria,
  borrarCategoria,
};
