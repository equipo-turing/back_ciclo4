import mongoose from 'mongoose';
import { ProjectModel } from '../proyecto/proyecto.js';
import { UserModel } from '../usuario/usuario.js';

const { Schema, model } = mongoose;


const inscriptionSchema = new Schema({
  estado: {
    type: String,
    enum: ['ACEPTADO', 'RECHAZADO', 'PENDIENTE'],
    default: 'PENDIENTE',
    required: true,
  },
  fechaIngreso: {
    type: Date,
    required: false,
  },
  fechaEgreso: {
    type: Date,
    required: false,
  },
  proyecto: {
    type: Schema.Types.ObjectId,
    ref: ProjectModel,
    required: true,
  },
  estudiante: {
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

inscriptionSchema.virtual('proyectoss', {
  ref: 'Proyecto',
  localField: 'proyecto',
  foreignField: '_id',
});
inscriptionSchema.virtual('estudiantess', {
  ref: 'User',
  localField: 'estudiante',
  foreignField: '_id',
});

const InscriptionModel = model('Inscripcion', inscriptionSchema, 'Inscripciones');

export { InscriptionModel };