import { ProjectModel } from '../proyecto/proyecto.js';
import { InscriptionModel } from './inscripcion.js';

const resolverInscripciones = {
  Inscripcion: {
    proyecto: async (parent, args, context) => {
      return await ProjectModel.findOne({ _id: parent.proyecto });
    },
  },
  Query: {
    Inscripciones: async (parent, args) => {
      const inscripciones = await InscriptionModel.find();
      return inscripciones;
    },
    EstudiantesRegistradosLiderInscripciones:async (parent,args)=>{ 
      //console.log(args.idLider)
      const inscripciones = await InscriptionModel.find().populate({path:'proyectoss'}).populate({path:'estudiantess'});
      //const proyectos = await ProjectModel.find({lider:obId}).populate('estudiante');
      console.log(inscripciones[0])
      return inscripciones;
    }
  },
  Mutation: {
    crearInscripcion: async (parent, args) => {
      const inscripcionCreada = await InscriptionModel.create({
        estado: args.estado,
        proyecto: args.proyecto,
        estudiante: args.estudiante,
      });
      return inscripcionCreada;
    },
    aprobarInscripcion: async (parent, args) => {
      const inscripcionAprobada = await InscriptionModel.findByIdAndUpdate(
        args.id,
        {
          estado: 'ACEPTADO',
          fechaIngreso: Date.now(),
        },
        { new: true }
      );
      return inscripcionAprobada;
    },
  },
};

export { resolverInscripciones };