//Rutas

const router = require("express").Router();
const events = require("../../controllers/events.controller");
const checkToken = require("../../middleware/auth");

//Declaramos todos los endpoints

router.get("/list", events.gelAll); //Nos devuelve el listado de todos los eventos deportivos (Le he tenido que cambiar el nombre de la ruta ya que tenemos otro metrodo de tipo get con el mismo nombre router.get("/", events.getypeEvents))
//router.get("/:eventId", events.getEventById); //Nos devuelve los detalles de un evento especifico
router.post("/", checkToken, events.createEvents); //Nos permite crear eventos nuevos
router.put("/:eventId", checkToken, events.updateEvent); //Nos permite actualizar un evento 
router.delete("/:eventId", checkToken, events.deleteEvent); //Elimina un evento específico

//IMPORTANTE: Para que funcionen estos endpoints, tenemos que comentar el endpoint getEventById porque sino da error
router.get("/upcoming", events.upcomingEvents); //Devuelve una lista con los proximos eventos
router.get("/", events.getypeEvents); //Permite filtrar eventos por el tipo de deporte
router.get("/date", events.getDateRange); //Devuelve los eventos dentro del rango de fechas especificado


module.exports = router; //Exportamos el paquete de rutas de los eventos