const { response } = require("express");
const { ProductoModel } = require("../models");

const crearProducto = async (req, res = response) => {
  try {
    const { usuario, estado, _id, ...producto } = req.body;

    producto.usuario = req.usuarioAutenticado._id;
    producto.name = producto.name.toLowerCase();

    const productoNew = await ProductoModel.create(producto);
    res.status(201).json({ msj: "producto creado correctamente", productoNew });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msj: "error interno del servidor",
      error: error.message,
    });
  }
};

const mostrarProductosPaginados = async (req, res = response) => {
  try {
    const { limit = 5, desde = 0 } = req.query;

    const productosPaginados = await ProductoModel.find({ estado: true })
      .skip(Number(desde))
      .limit(Number(limit))
      .populate({ path: "categoria" })
      .populate({ path: "usuario", select: "name" });

    return res.json({
      message: productosPaginados,
    });
  } catch (error) {
    console.log("error este:", error);
    res.status(500).json({
      error: error.message,
    });
  }
};

const mostrarProductosPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await ProductoModel.findById(id);
    res.json(producto);
  } catch (error) {}
};

const borrarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductoModel.findByIdAndUpdate(id, { estado: false });
    res.json({
      msj: `el producto a sido eliminado correctamente`,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuario, _id, estado, ...producto } = req.body;
    if(producto.name){
      producto.name=producto.name.toLowerCase()
    }
    producto.usuario = req.usuarioAutenticado._id;
    const productoAct = await ProductoModel.findByIdAndUpdate(id, producto, {
      new: true,
    })
      .populate({ path: "usuario", select: "name" })
      .populate({ path: "categoria" });

    return res.json({
      productoAct,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
module.exports = {
  crearProducto,
  mostrarProductosPaginados,
  mostrarProductosPorId,
  borrarProducto,
  actualizarProducto,
};
