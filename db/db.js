import mongoose from 'mongoose';

const conectarBD = async () => {
  return await mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {

        //mongodb+srv://turing:<password>@clustergestionproyecto.2sfu5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
      console.log('Conexion exitosa');
    })
    .catch((e) => {
      console.error('Error conectando a base de datos', e);
    });
};

export default conectarBD;