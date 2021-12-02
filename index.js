import express from 'express';
import cors from 'cors';
import {ApolloServer} from 'apollo-server-express';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import { tipos} from './graphql/types.js';
import { resolvers } from './graphql/resolvers.js';

// **********************CONFIGURAANDO EL SERVIDOR**************************

dotenv.config();

//definiendo un servidor de graphql- apolo
const server = new ApolloServer({
  //se le pasan dos propiedades importantes,tipos y resolves
  typeDefs: tipos, 
  resolvers: resolvers,

});

const app = express();
app.use(express.json());//para que los reques entren y salgan de tipo json
app.use(cors());//el cors para hacer request desde muchos orígenes

app.listen({ port: process.env.PORT || 4000 },async ()=>{
  await connectDB();//conexion a bd
  await server.start();//prendemos el servidor de apolo

  server.applyMiddleware({app});

  console.log('servidor listo');
});



