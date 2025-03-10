//Estructura de datos
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creamos el tipo de dato de la coleccion Users
const userSchema = new Schema({
    username: {type : String, required : true, unique: true},
    password: {type: String, required :  true}
},{
    collection: "users",
});

//Y por ultimo creamo la coleccion con el nombre de users y tipo userSchema
const Users = mongoose.model("users", userSchema);
module.exports = Users;