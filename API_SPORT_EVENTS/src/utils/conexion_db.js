//Conexion con la bbdd

//Creamos la constante donde almacenaremos nuestra URI con la bbdd
const uri = "mongodb+srv://usersport:p4SVsjXHsdjz7lGJ@cluster0.2rnhv.mongodb.net/sport?retryWrites=true&w=majority&appName=Cluster0";
//Importamos la funcion mongoose para poder realizar una conexión directa con MongoDB
const mongoose =  require("mongoose");

const connectDB = async () => {
    try{
        const db = await mongoose.connect(process.env.DB_URI);
        const {name, host} = db.connection;
        console.log(`Nombre DB: ${name} y HOST: ${host}`);

    }catch(error){
        console.log(error);
    }
};

//Exportamos el modulo donde contiene la conexión para poder utilizarlo en el fichero index
module.exports = connectDB;
