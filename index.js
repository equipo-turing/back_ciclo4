import {conectarBD} from './db/db.js';
import dotenv from 'dotenv';
import {AvancesModel} from './model/avances.js';

dotenv.config();//para que funcione el archivo .env

const main=async()=>{
    await conectarBD();//me conecto a la base de datos
    
    //creo la colección (tabla) "avances" en mongodb
     await AvancesModel.create({ 
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
}

main();