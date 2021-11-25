
import dotenv from 'dotenv';
import conectarBD from './db/db.js';
import { UserModel } from './models/usuario/usuario.js';
import { ProjectModel } from './models/proyecto/proyecto.js';
import { ObjectiveModel } from './models/objective.js';
//import { Enum_EstadoUsuario, Enum_Rol, Enum_TipoObjetivo } from './models/enums/enums';

import { InscriptionModel } from './models/inscripcion/inscripcion.js';

dotenv.config();//para que funcione el archivo .env

const main=async()=>{
    await conectarBD();//me conecto a la base de datos
    
    //creo la colección (tabla) "avances" en mongodb
     /* await AvancesModel.create({ 
         //le paso datos quemados a la colección:      
        fecha:new Date("05-1-2021"),
        descripcion:'primer avance',
        observaciones:'el primer avance fué exitoso',
       // creadopor:"id mongo del usuario"
    }).then((avances)=>{
        console.log('coleccion avances creada: ',avances);
    }).catch((e)=>{
        console.error("error creando coleción avances ",e);
    }); 
 */
    // colección objetivo

    /*await ObjectiveModel.create({
        descripcion:"permitir generar los objetivos ",
    }).then((objetivo)=>{
        console.log('coleccion objetivo creado',objetivo);
    }).catch((e)=>{
        console.log('error  creando objetivo',e);
    });*/

    const usuarioInicial = await UserModel.create({
        nombre: 'LAURA',
        apellido: 'Trujillo',
        correo: 'laura@unilibre.com',
        identificacion: '31231',
        rol: 'ESTUDIANTE',
        estado: 'AUTORIZADO',
      });
    
    const proyectoCreado = await ProjectModel.create({
        nombre: 'UNIVERSIDAD LIBRE',
        fechaInicio: new Date('2021/12/24'),
        fechaFin: new Date('2022/12/24'),
        presupuesto: 111111,
        lider: usuarioInicial._id,
    });
    
    //falta crear la inscripcion
    const inscripcionCreada = await InscriptionModel.create({
        estado:'ACEPTADO',
        fechaIngreso: new Date('2021/12/24'),
        fechaEgreso: new Date('2022/12/24'),
        proyecto:proyectoCreado.id,
        estudiante:usuarioInicial._id,
    });
}

main();