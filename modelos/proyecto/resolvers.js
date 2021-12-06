
import { ProjectModel } from "./proyecto.js";
import { ObjectId } from 'mongodb';


const resolversProyecto ={
    Query:{
        
        Proyectos: async (parent, args) => {
            const proyectos = await ProjectModel.find().populate('lider');
            return proyectos;
        },

       
    },
    Mutation:{
        
          crearProyecto: async (parent, args,context) => {
            const proyectoCreado = await ProjectModel.create({
              nombre: args.nombre,
              estado: args.estado,
              fase: args.fase,
              fechaInicio: args.fechaInicio,
              fechaFin: args.fechaFin,
              presupuesto: args.presupuesto,
              lider: args.lider,
              objetivos: args.objetivos,
            });
            return proyectoCreado;
          },

          editarProyecto: async (parent, args) => {
            const proyectoEditado = await ProjectModel.findByIdAndUpdate(
              args._id,
              { ...args.campos },
              { new: true }
            );
            return proyectoEditado;
          },
          crearObjetivo: async (parent, args) => {
            const proyectoConObjetivo = await ProjectModel.findByIdAndUpdate(
              args.idProyecto,
              {
                $addToSet: {
                  objetivos: { ...args.campos },
                },
              },
              { new: true }
            );
      
            return proyectoConObjetivo;
          },
          editarObjetivo: async (parent, args) => {
            const proyectoEditado = await ProjectModel.findByIdAndUpdate(
              args.idProyecto,
              {
                $set: {
                  [`objetivos.${args.indexObjetivo}.descripcion`]: args.campos.descripcion,
                  [`objetivos.${args.indexObjetivo}.tipo`]: args.campos.tipo,
                },
              },
              { new: true }
            );
            return proyectoEditado;
          },
          
          eliminarObjetivo: async (parent, args) => {
            const proyectoObjetivo = await ProjectModel.findByIdAndUpdate(
              { _id: args.idProyecto },
              {
                $pull: {
                  objetivos: {
                    _id: args.idObjetivo,
                  },
                },
              },
              { new: true }
            );
            return proyectoObjetivo;
          },
          
          editarProyectoLider: async (parent,args) =>{
            //validamos que el proyecto este activo primero 
            console.log(args.idLider)
            const obId = ObjectId(args.idLider)
            const proyectos = await ProjectModel.find({lider:obId,_id:args.idProyecto,estado:"ACTIVO"}).populate('lider');
            console.log("este es el proyecto",proyectos)
            //const proyectos = await ProjectModel.findOneAndUpdate().populate('lider');
            if (proyectos.length == 0) {
              return {"Respuesta":"No hay proyectos activos para ese lider"}
            }
            return proyectos;
          }
        },

      };
      
      export { resolversProyecto };
    