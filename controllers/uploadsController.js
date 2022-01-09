const { request, response } = require("express");
const path = require("path");
const fs = require("fs");
const cloudinary =require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const { subirArchivo, validarModelo, mostrarImgPorDefecto } = require("../helpers");


const cargarArchivo = async (req = request, res) => {
  const archivoSubido = await subirArchivo(req.files, undefined);
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  res.json({
    name: archivoSubido,
  });
};

const updateImg = async (req, res) => {
  try {
    const { coleccion, id } = req.params;
    let nombreArchivo;

    const modelo = await validarModelo(coleccion, id);

    //limpiar imagenes previas
    if (modelo.img) {
     
      const pathImg = path.join(__dirname, "../uploads", coleccion, modelo.img);

      if (fs.existsSync(pathImg)) {
        fs.unlinkSync(pathImg);
      }
    }

    nombreArchivo = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombreArchivo;
    await modelo.save();
    return res.json({ msj: "imagen actualizada", nombreArchivo });
  } catch (error) {
    console.log(error);
    res.status(500).json("Error interno del servidor");
  }
};


const updateImgCloudinary = async (req, res) => {
  try {
    const { coleccion, id } = req.params;
    let nombreArchivo;

    const modelo = await validarModelo(coleccion, id);

    //limpiar imagenes previas
    if (modelo.img) {
     const arr= modelo.img.split('/');
     const [public_id]=arr[arr.length -1].split('.') // const public_id= arr.split('.')[0]
  
     cloudinary.uploader.destroy(public_id)
      
    }
     const {tempFilePath}=req.files.archivo  //el path temporal donde eesta guaradad la imagen
     const{secure_url}=await cloudinary.uploader.upload(tempFilePath)
    
     modelo.img = secure_url;
    await modelo.save();
    return res.json({ msj: "imagen actualizada", secure_url});
  } catch (error) {
    console.log(error);
    res.status(500).json("Error interno del servidor");
  }
};

const mostrarImagen = async (req, res = response) => {
  try {
    const { coleccion, id } = req.params;
    const modelo = await validarModelo(coleccion, id);
    //limpiar imagenes previas
    if (modelo) {
      if (modelo.img) {
        const pathImg = path.join(
          __dirname,
          "../uploads",
          coleccion,
          modelo.img
        );

        if (fs.existsSync(pathImg)) {
          return res.sendFile(pathImg);
        }
        mostrarImgPorDefecto(res)
      } else {
        mostrarImgPorDefecto(res)
      }
    }

    //return res.json({ msj: "imagen actualizada", nombreArchivo });
  } catch (error) {
    console.log(error);
    res.status(500).json("Error interno del servidor");
  }
};
module.exports = {
  cargarArchivo,
  updateImg,
  mostrarImagen,
  updateImgCloudinary
};
