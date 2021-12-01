import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (correo) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(correo);
        //   },
        // validator: async (correo) => {
        //   if (!(correo.includes('@') && correo.includes('.'))) {
        //     return false;
        //   }
      },
      message: "Por favor ingrese un correo válido",
    },
  },
  identificacion: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    required: true,
    enum: ['ESTUDIANTE', 'LIDER', 'ADMINISTRADOR'],
  },
  estado: {
    type: String,
    required: true,
    enum: ['PENDIENTE', 'AUTORIZADO', 'NO_AUTORIZADO'],
    default: 'PENDIENTE',
  },
});

userSchema.virtual('proyectosLiderados', {
  ref: 'Proyecto',
  localField: '_id',
  foreignField: 'lider',
});

userSchema.virtual('avancesCreados', {
  ref: 'Avance',
  localField: '_id',
  foreignField: 'creadoPor',
});

userSchema.virtual('inscripciones', {
  ref: 'Inscripcion',
  localField: '_id',
  foreignField: 'estudiante',
});

const UserModel = model('Usuario', userSchema );

export { UserModel };