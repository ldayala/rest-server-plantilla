const mongoose= require('mongoose');

const conexionDb= async()=>{
    try {

        await mongoose.connect(process.env.MONGODB_CON)
        console.log(" conectado a la bd correctamente");
    } catch (error) {
        console.log(error);
        throw new Error(" Error al inicializar la base de dato")
    }
}

module.exports={
    conexionDb
}