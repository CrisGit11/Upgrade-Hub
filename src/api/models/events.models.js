//Estructura de datos
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creamos el tipo de dato de la coleccion Events
const eventSchema = new Schema({
    nombre: {type : String, required : true},
    descripcion: {type: String, required :  true},
    fecha: {type : Date},
    ubicacion: {type : String, required : true},
    tipoDeporte: {type : String, required : true},
    organizador: [{type: Schema.Types.ObjectId, ref: "users"}]
},{
    collection: "events",
});

//Y por ultimo creamo la coleccion con el nombre de events y tipo eventSchema
const Events = mongoose.model("events", eventSchema);
module.exports = Events;