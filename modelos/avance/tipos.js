import { gql } from 'apollo-server-express';

const tiposAvance = gql`
  type Avance {
    _id: ID!
    fecha: Date!
    descripcion: String!
    observaciones: [String]
    proyecto: Proyecto!
    creadoPor: Usuario!
  }
  type Av{
    _id:ID!
    fecha:Date!
    descripcion:String!
  }
  type Query {
    Avances: [Avance]
    filtrarAvance(_id: String!): [Avance]
  }
  type Mutation {
    crearAvance(fecha: Date!, descripcion: String!, proyecto: String!, creadoPor: String!): Avance
    agregarObservacion(_id:String!,observaciones: String!):Av
    editarDescripcionAvance(_id:String!,descripcion:String!):Avance
  }
`;

export { tiposAvance };