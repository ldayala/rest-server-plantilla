const express = require("express");
const cors= require('cors');
const fileUpload = require("express-fileupload");
const { conexionDb } = require("../database/config");


// en esta clase hago toda la parte del servidos de expres  para asi tener un codigo mas limpio
class Server {

    constructor(){
        this.app=express()
        this.puerto=process.env.PORT
        this.path={
           user:'/api/user',
           auth:'/api/auth',
           categoria:'/api/categorias',
           productos:'/api/productos',
           buscar:'/api/buscar',
           uploads:'/api/uploads'
        }
        
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
        // carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true  //permite crear la carpeta si no existe, por defecto esta en false
        }));
    }

    
    routes(){
        //para obtener las rutas voy a usar un middleware, aqui configuramos el router para que este path que le enviamos aqui sea el path que reciba
        //en las peticiones que tenemos en user router
        this.app.use(this.path.auth,require('../routes/auth'))
        this.app.use(this.path.user,require('../routes/user'))
        this.app.use(this.path.categoria,require('../routes/categorias'))
        this.app.use(this.path.productos,require('../routes/productos'))
        this.app.use(this.path.buscar,require('../routes/buscar'))
        this.app.use(this.path.uploads,require('../routes/uploads'))

    }

    listen(){
        this.app.listen(this.puerto,()=>{
            console.log(`App corriendo en el puerto ${this.puerto}`);
        })
    }
}

module.exports = Server;
