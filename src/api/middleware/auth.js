//Importamos las dependencias necesarias
const jwt = require("jsonwebtoken");

//Impostamos los modelos necesarios 
const User = require("../models/users.models");
//const Event = require("../models/events.models");

const checkToken = async (req, res, next) =>{
    try{
        //Comprobamos si el token viene incluido en la cabecera de Authorization
        if(!req.headers["authorization"]){
            return res.status(403).json({message: "Es necesario incluir el token"});
        };
        //En el caso de venir incluido, le tendremos que quitar la palabra Bearer para que pueda funcionar correctamente
        const tokenString = req.headers["authorization"];
        const token = tokenString.split(" ")[1];
        let data;

        try{
            data = jwt.verify(token, process.env.JWT_API_SECRET);
        }catch(error){
            return res.status(403).json({message: "El token es incorrecto"});
        }

        const user = await User.findById(data.user_id); //Comprobamos si dicho usuario existe en la bbdd
        if(!user){
            return res.status(403).json({message: "El usuario no existe"});
        }
        
        req.user = user; //Igualamos el request al usuario recibido
        next(); //Y pasamos a ejecutar el controlador de la ruta privada / protegida
    }catch(error){
        res.status(500).json({message: error});
    }
};
module.exports = checkToken;