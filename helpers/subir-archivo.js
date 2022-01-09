const { v4: uuidv4 } = require("uuid");
const path = require("path");
const subirArchivo = (
  files,
  extensionesPermitidas = ["png", "jpg", "jpeg", "gif"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    const { archivo } = files;
    const archivoCortado = archivo.name.split(".");
    const extension = archivoCortado[archivoCortado.length - 1];
    //validando la extension del archivo
    if (!extensionesPermitidas.includes(extension))
      return reject(
        `la extension ${extension} no es valida, extenciones permitidas: ${extensionesPermitidas}`
      );
    //renombrando el archico con un nombre unico
    const nombreTemp = uuidv4() + "." + extension;
    //path donde se va a guardar el archivo
    const uploadPath = path.join(__dirname, "../uploads/", carpeta, nombreTemp);

    // Use the mv() method to place the file somewhere on your server
    archivo.mv(uploadPath, function (err) {
      if (err) reject(err);

      resolve(nombreTemp);
    });
  });
};

module.exports = {
  subirArchivo,
};
