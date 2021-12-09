import mongoose from 'mongoose';
import { ProjectModel } from '../proyecto/proyecto.js';
import { UserModel } from '../usuario/usuario.js';

const { Schema, model } = mongoose;

//interface Avance {
  //descripcion: string;
  //fecha: Date;
  //observaciones: [string];
  //proyecto: Schema.Types.ObjectId;
  //creadoPor: Schema.Types.ObjectId;
//}

const avanceSchema = new Schema({
  fecha: {
    type: Date,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  observaciones: [
    {
      type: String,
    },
  ],
  proyecto: {
    type: Schema.Types.ObjectId,
    ref: ProjectModel,
    required: true,
  },
  creadoPor: {
    type: Schema.Types.ObjectId,
    ref: UserModel,
    required: true,
  },
},
{
  toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
  toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
}
);

const ModeloAvance = model('Avance', avanceSchema);

export { ModeloAvance };