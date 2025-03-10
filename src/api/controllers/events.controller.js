//Controlador de funciones

const Events = require("../models/events.models");
const mongoose = require('mongoose');

const createEvents = async (req, res) => {
    try{
        const {nombre, descripcion, fecha, ubicacion, tipoDeporte} = req.body; //Recogemos los datos recibidos en el body para crear el evento
        const user = req.user; //Obtenemos el usuario que se ha autenticado

        //comprobamos que el formato de la fecha sea el correcto
        const parsedDate = Date.parse(fecha);
        if(isNaN(parsedDate)){
            return res.status(400).json({message: "La fecha proporcionada no tiene un formato válido"});
        }

        // Si la fecha es válida, convertirla a un objeto Date
        const validDate = new Date(parsedDate);
        //Comprobamos previamente si el evento que queremos crear no existe ya en el sistema
        const existingEvent = await Events.findOne({ nombre,fecha,ubicacion,tipoDeporte,organizador: user._id});
        if(existingEvent){
            return res.status(400).json({message: "Ya existe un evento con los mismos detalles"});
        };
        
        //Creamos el evento con los datos necesarios en el caso de no existir
        const newEvent = new Events({
            nombre,
            descripcion,
            fecha,
            ubicacion,
            tipoDeporte,
            organizador: [user._id] //Le asociamos el organizador que se ha autenticado
        });

        const createdEvent = await newEvent.save(); //Guardamos el evento en la bbdd
        res.status(201).json({message: "El evento se ha creado correctamente", event: createdEvent})
       
    }catch(error){
        res.status(500).json({message: error});
    };
    
};

const gelAll = async (req, res) => {
    try{
        const listEvents = await Events.find().populate('organizador'); //Buscamos todos los eventos de nuestra bbdd
        if(listEvents.length !== 0){
            res.status(200).json({message: "Mostrando el listado de todos los eventos", events: listEvents});
        }else{
            return res.status(404).json({message: "No hay eventos disponibles"});
        };
        
    }catch(error){
        res.status(500).json({message: error});
    };
};

const getEventById = async (req, res) => {
    try {
        const {eventId} = req.params; //Obtenemos el ID del evento que queremos buscar
        // Validamos si el ID es un ObjectId válido
        if(!mongoose.Types.ObjectId.isValid(eventId)){
            return res.status(400).json({message: "ID no válido"});
        };
        const event = await Events.findById(eventId); // Busca el evento por su ID
        if(!event){
            return res.status(404).json({message: "Evento no encontrado"});
        };
        res.status(200).json(event); //Devolvemos el resultado de la busqueda
        
    }catch(error){
        res.status(500).json({message: error});
    };
    
};

const updateEvent = async (req, res) => {
    try {
        const {eventId} = req.params; //Recibimos el ID del evento que queremos actualizar
        const eventUpdate = req.body //Recibimos los parametros que queremos actualizar
        // Validamos si el ID es un ObjectId válido
        if(!mongoose.Types.ObjectId.isValid(eventId)){
            return res.status(400).json({message: "ID no válido"});
        };
        const event = await Events.findByIdAndUpdate(eventId, eventUpdate, {new: true}); // Busca el evento por su ID y el añadimos los parametros a actualizar
        if(!event){
            return res.status(404).json({message: "Evento no encontrado"});
        };
        res.status(200).json({message: "Evento actualizado con éxito", data: event}); //Devolvemos el resultado de la busqueda
        
    }catch(error){
        res.status(500).json({message: error});
    };
    
};

const deleteEvent = async (req, res) => {
    try {
        const {eventId} = req.params; //Recibimos el ID del evento que queremos eliminar
        // Validamos si el ID es un ObjectId válido
        if(!mongoose.Types.ObjectId.isValid(eventId)){
            return res.status(400).json({message: "ID no válido"});
        
        };
        const event = await Events.findByIdAndDelete(eventId); // Busca el evento por su ID y lo eliminamos
        if(!event){
            return res.status(404).json({message: "Evento no encontrado"});
        };
        res.status(200).json({message: "Evento eliminado con éxito"}); //Devolvemos el resultado de la busqueda
        
    }catch(error){
        res.status(500).json({message: error});
    };
    
};

const upcomingEvents = async (req, res) => {
    try {
        const events = await Events.find({fecha: {$gte: new Date()}}).sort({fecha: 1});  //Buscamos los eventos que son proximos a la fecha
        if (events.length === 0){
            return res.status(404).json({message: "No hay eventos próximos"});
        };
        res.status(200).json(events); //Enviamos respuesta con los eventos encontrados
    }catch(error){
        res.status(500).json({message: "Error al obtener los eventos próximos"});
    };

};

const getypeEvents = async (req, res) => {
    const {type} = req.query;  //Obtenemos por la query el tipo de deporte que queremos filtrar
    try {
        // Busca los eventos que coincidan con el tipo de deporte especificado
        const events = await Events.find({tipoDeporte: new RegExp(type, "i")});
        if(events.length === 0){
            return res.status(404).json({message: `No hay eventos de tipo ${type}`});
        };
        res.status(200).json(events); //Respondemos con los eventos encontrados

    }catch(error){
        res.status(500).json({message: "Error al obtener los eventos por tipo", error});
    };
    
};

const getDateRange = async (req, res) => {
    const {from, to} = req.query;  //Obtenemos las fechas de inicio y fin que tendra nuestro rango de busqueda
    //Verificamos si esos datos se han añadido en la url
    if(!from || !to){
        return res.status(400).json({message: "Se deben proporcionar las fechas 'from' y 'to'"});
    };

    //Convertimos los parámetros de fecha en objetos de tipo Date
    const startDate = new Date(from);
    const endDate = new Date(to);

    //Verificamos si las fechas son válidas
    if(isNaN(startDate.getTime()) || isNaN(endDate.getTime())){
        return res.status(400).json({message: "Las fechas proporcionadas no son válidas"});
    };

    try {
        const events = await Events.find({fecha: {$gte: startDate, $lte: endDate}}).sort({fecha: 1}); //Busca los eventos dentro del rango de fechas especificado
        if(events.length === 0){
            return res.status(404).json({message: "No se encontraron eventos en este rango de fechas"});
        };
        res.status(200).json(events); 

    }catch(error){
        res.status(500).json({message: "Error al obtener los eventos por rango de fechas"});
    };
    
};

module.exports = {createEvents, gelAll, getEventById, updateEvent, deleteEvent, upcomingEvents, getypeEvents, getDateRange};