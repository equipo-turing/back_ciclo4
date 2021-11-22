import mongoose from 'mongoose';
const {model } = mongoose;

//se define el esquema para la colección(tabla) "avances", 
//los esquemas son representación del uml pero en código
const avancesSchema = new mongoose.Schema({
    //_id : no se coloca porque mongo lo hace automaticamente     
    fecha:{
        type:Date,
        required:true

    },
    descripcion:{
        type:String,
        required:true
    },
    observaciones:{
        type:String,
        required:false,
    }
   /*  
   se habilita cuando esté la colección usario creada
   creadopor:{ 
        type:Schema.Types.ObjectId,
        required:true,
        //ref:usuarioModel
    }  */

});

//para poder usar el esquema se necesita crear un modelo u objeto de el esquema avances:
//le pasamos el nombre como quiero que se llame la tabla o coleccion en la bd y el esquema que creamos
const AvancesModel=model('Avances',avancesSchema);
export {AvancesModel}; //finalmente exportamos el modelo u objeto para poder ser usado en otras partes del código


/* observaciones:{
    type:String,
    required:false,
    enum:["ESTUDIANTE","LIDER",ADAMIN]
} */