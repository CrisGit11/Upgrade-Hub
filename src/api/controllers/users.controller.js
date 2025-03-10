//Controlador de funciones
//Importanmos dependencias necesarias
const bcrypt = require("bcrypt");
const {createToken} = require("../../utils/jwt");
//Importamos el modelo creado de Users
const Users = require("../models/users.models");

const createUser = async (req, res) => {
    try{
        let {username, password} = req.body; //Obtenemos los datos que queremos almacenar del body
        const userDB = await Users.findOne({username}); //Comprobamos si el usuario ha sido creado anteriormente
        if(!userDB){
            password = bcrypt.hashSync(password, 10); //Encriptamos la contraseña
            const newUser = new Users({username, password}); //Convertimos dichos datos en un documento de mongo
            const createdUser = await newUser.save(); //Guardamos los datos en nuestra bbdd

            //Definimos la respuesta que queremos que vea el usuario
            res.status(201).json({
                success: true,
                message: "El usuario se ha registrado correctamente",
                data: createdUser,
            });
        }else{
            res.status(400).json({
                success: false,
                message: 'El usuario ya existe en la base de datos',
            });
        };
    }catch(error){
        res.status(500).json({message: error});
    };
    
};

const loginUser = async (req, res) => {

    try{
        let {username, password} = req.body;
        const userDB = await Users.findOne({username});
        //Si el usuario buscado no existe, devolvemos error
        if(!userDB){
            return res.status(400).json({success: false, message: "El usuario indicado no existe"});
            
        }else{
            const isSame = bcrypt.compareSync(password, userDB.password); //Comparamos si la contraseña recibida en el body es la misma que esta en la bbdd
            if(!isSame){
                return res.status(400).json({success: false, message: "Contraseña incorrecta"});
            };
            const token = createToken(userDB);
            res.status(200).json({success: true, token: token});
        };
    }catch(error){
        res.status(500).json({message: error});
    };
};

const getProfile = async (req, res) => {
    try{
        res.status(200).json({success: true, data: req.user});
    }catch(error){
        res.status(500).json({success: false, message: error});
    }
};

module.exports = {createUser, loginUser, getProfile};