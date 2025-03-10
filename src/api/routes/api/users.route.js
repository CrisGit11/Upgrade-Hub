//Rutas

const router = require("express").Router();
const user = require("../../controllers/users.controller");
const checkToken = require("../../middleware/auth");

//Declaramos todos los endpoints

router.post("/register", user.createUser); //Nos permite registrar un nuevo usuario
router.post("/login", user.loginUser); //Nos permite hacer login de un usuario ya existente
router.get("/profile", checkToken, user.getProfile); //Nos permite revisar el perfil de un usuario ya existente

module.exports = router; //Exportamos el paquete de rutas de los usuarios