const express = require("express");
const cors= require('cors');
const { conexionDb } = require("../database/config");



// en esta clase hago toda la parte del servidos de expres  para asi tener un codigo mas limpio
class Server {

    constructor(){
        this.app=express()
        this.puerto=process.env.PORT
        this.userPath='/api/user'
        this.authPath='/api/auth'
        //conexion a la base de datos
        this.conectionDB()
        //middleware
        this.middleware()
        


        this.routes()
      

    }

    async conectionDB(){
        await conexionDb();

    }
    middleware(){
        //cors
        this.app.use(cors())
        //activar directorio publico
        this.app.use(express.static('public'))
        //lectura y parseo del body
        this.app.use(express.json())

    }

    
    routes(){
        //para obtener las rutas voy a usar un middleware, aqui configuramos el router para que este path que le enviamos aqui sea el path que reciba
        //en las peticiones que tenemos en user router
        this.app.use(this.authPath,require('../routes/auth'))
        this.app.use(this.userPath,require('../routes/user'))
        
    }

    listen(){
        this.app.listen(this.puerto,()=>{
            console.log(`App corriendo en el puerto ${this.puerto}`);
        })
    }
}

module.exports = Server;
