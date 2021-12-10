import { InscriptionModel } from '../inscripcion/inscripcion.js';
import { UserModel } from '../usuario/usuario.js';
import { ProjectModel } from './proyecto.js';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const resolversProyecto = {
  Proyecto: {
    lider: async (parent, args, context) => {
      const usr = await UserModel.findOne({
        _id: parent.lider.toString(),
      });
      return usr;
    },
  },
  Query: {
    Proyectos: async (parent, args, context) => {
      const proyectos = await ProjectModel.find();
      return proyectos;
    },
    ProyectosLiderados: async (parent,args)=>{
      console.log(args.idLider)
      const obId = ObjectId(args.idLider)
      const proyectos = await ProjectModel.find({lider:obId}).populate('liderr');
      console.log(proyectos)
      return proyectos;
    },
    EstudiantesRegistradosLider:async (parent,args)=>{
      console.log(args.idLider)
      console.log("ho")
      //const proyectos = await ProjectModel.find({lider:obId}).populate('inscripciones').populate('lider');
      //const proyectos = await ProjectModel.find({lider:args.idLider}).populate('inscripciones').populate('');
      const proyectos = await ProjectModel.find({lider:args.idLider}).populate('liderr').populate('inscripciones');
      
      //console.log(proyectos[0].inscripciones)
      console.log(proyectos)
      return proyectos;
    },
    informacionAvancesProyecto:async(parent,args)=>{
      const proyectos = await ProjectModel.find({_id:args._id}).populate('avances').populate('liderr');
      //console.log(proyectos[0].inscripciones)
      console.log(proyectos)
      return proyectos[0];
    },
    
  },
  Mutation: {
    crearProyecto: async (parent, args, context) => {
      const proyectoCreado = await ProjectModel.create({
        nombre: args.nombre,
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
        return {"Respuesta":"No hay proyectos activos para ese lider"};
      }
      const actualizar_proyecto = await ProjectModel.findByIdAndUpdate(args.idProyecto ,
        {
          nombre:args.campos.nombreProyecto,
          objetivos:args.campos.objetivos,
          presupuesto:args.campos.presupuesto
        },
        { new: true }  
      );
      return actualizar_proyecto;
    }
  },
};

export { resolversProyecto };
