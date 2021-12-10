import { gql } from 'apollo-server-express';

const tiposInscripcion = gql`
  type Inscripcion {
    _id: ID!
    estado: Enum_EstadoInscripcion!
    fechaIngreso: Date
    fechaEgreso: Date
    proyecto: ProyectoU!
    estudiante: Usuario!
  }
  type InscripcionesUsuario{
    _id: ID!
    estado: Enum_EstadoInscripcion!
    fechaIngreso: Date
    fechaEgreso: Date
    proyectoss: [Proyecto]!
    estudiantess: [Usuario]
  }
  type Inscrip{
    _id: ID!
    estado: Enum_EstadoInscripcion!
    fechaIngreso: Date
    fechaEgreso: Date
    proyectoss: Proyecto
    estudiantess: Usuario
  }
  type Query {
    Inscripciones: [Inscripcion]
    EstudiantesRegistradosLiderInscripciones:[InscripcionesUsuario]
    inscripcionProyectoAvance(_idEstudiante:String!):[InscripcionesUsuario]
    
  }
  type Mutation {
    crearInscripcion(
      estado: Enum_EstadoInscripcion!
      proyecto: String!
      estudiante: String!
    ): Inscripcion
    aprobarInscripcion(id: String!): Inscripcion
    editarEstadoInscripcion(_idInscripcion:String!,estado:Enum_EstadoInscripcion!):InscripcionesUsuario
  }
`;

export { tiposInscripcion };