const path = require("path");
const fs=require('fs')
const mostrarImgPorDefecto=(res)=>{
    const pathNoImg = path.join(__dirname, "../assets/no-image.jpg");
     return res.sendFile(pathNoImg);
}

module.exports={
    mostrarImgPorDefecto
}