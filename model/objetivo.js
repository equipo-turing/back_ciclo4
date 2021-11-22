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
        enum:["general","especifico"],
        default:"general"
    },

});

const objetivoModel= model("objetivo",objetivoSchema);
export {objetivoModel};


