import mongoose from 'mongoose';
const {model } = mongoose;

const objetivoSchema = new mongoose.Schema({
    descripcion:{
        type:String,
        required:true
    },

    tipo:{
        type:String,
        required:true,
        
    },

});

const objetivoModel= model("objetivo",objetivoSchema);
export {objetivoModel};


