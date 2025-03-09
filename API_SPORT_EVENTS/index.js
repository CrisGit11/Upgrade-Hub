//Importamos las dependencias necesarias
const express = require("express");
const cors = require("cors");

//Importamos el modulo donde contiene la bbdd
const connectDB = require("./src/utils/conexion_db");
const router = require("./src/api/routes/api.routes");

//configuramos para que trabaje con variables de entorno
require("dotenv").config();

//Ejecutamos la bbdd
connectDB();
const server = express();
server.use(express.json());
server.use(cors());
server.use("/api", router);

const PORT = process.env.PORT;
server.listen(PORT, ()=>{
    console.log(`Server running http://localhost:${PORT}`);
});