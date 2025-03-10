//Importamos la dependencia para poder usar el token
const jwt = require("jsonwebtoken");

//Creamos el token
const createToken = (info) => {
    const data = {
        user_id: info._id,
        user_username: info.username,
        user_password: info.password,
    };
    return jwt.sign(data, process.env.JWT_API_SECRET, {expiresIn: '1h'});
};

module.exports = {createToken};