import { ModeloAvance } from './avance.js';

const resolversAvance = {
    Query: {
      Avances: async (parent, args) => {
        const avances = await ModeloAvance.find().populate('proyecto').populate('creadoPor');
        return avances;
      },
      filtrarAvance: async (parents, args) => {
        const avanceFiltrado = await ModeloAvance.find({ proyecto: args._id })
          .populate('proyecto')
          .populate('creadoPor');
        return avanceFiltrado;
      },
    },
    Mutation: {
      crearAvance: async (parents, args) => {
        const avanceCreado = ModeloAvance.create({
          fecha: args.fecha,
          descripcion: args.descripcion,
          proyecto: args.proyecto,
          creadoPor: args.creadoPor,
        });
        return avanceCreado;
      },
      agregarObservacion:async (parent,args)=>{
        //const adva = ModeloAvance.findById(args._id);
        // const avanceCreado = ModeloAvance.findByIdAndUpdate(args._id,{
        //   ...args.campos
        // })
        const adva = ModeloAvance.findByIdAndUpdate(
          args._id,
          { $push: { observaciones: args.observaciones } },
          
        );
        console.log(args.observaciones,args._id)
        return adva;
      },
      editarDescripcionAvance:async (parent,args)=>{
        const adva = ModeloAvance.findByIdAndUpdate(
          args._id,
          { descripcion:args.descripcion},
        );
        return adva;
      }
    },
  };
  
  export { resolversAvance };