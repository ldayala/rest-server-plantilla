const { Schema, model, SchemaTypes } = require('mongoose')


const ProductoSchema= Schema({
    name: {
        type: String,
        required: [true, "the name is mandatory"],
        unique: true,
      },
      estado: {
        type: Boolean,
        requered: [true, "the estado is mandatory"],
        default: true,
      },
      usuario: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      precio:{
          type:Number,
          default:0
      },
      categoria:{
          type:SchemaTypes.ObjectId,
          ref:'Categoria',
          required:true

      },
      descripcion:String,
      disponible:{
          type:Boolean,
          default:true
      },
      img:String
})

module.exports=model('Producto',ProductoSchema);