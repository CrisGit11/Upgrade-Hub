const express = require('express');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(cors());

const PORT = 4000;
server.listen(()=>{
    console.log(`Servidor ejecutando por el puerto http://localhost:${PORT}`);
})

const user = [{name: "Maria", lastname: "Perez"}, {name: "`Pedro`", lastname: "Rodriguez"}];
const products = [{name: "consulta nutricion", precio: 150}, {name: "fisioterapia", precio: 120}];
//Almacenamos las direcciones de los routers
const routerProduct = express.Router();
const routerUser = express.Router();


//endpoints

//liste todos los productos de mi web
routerProduct.get("/list", (req, res)=>{
    // buscar en la bbdd los productos
    //devolver la respuesta al clientes ---> json, html, pdf, motores de plantillas
    res.json(products);
});

routerUser.get("/list", (req, res)=>{
    // buscar en la bbdd los productos
    //devolver la respuesta al clientes ---> json, html, pdf, motores de plantillas
    res.json(user);
});

//configuramos los servidores para que tenga tantas rutas como necesitemos
server.use("/product", routerProduct);
server.use("/user", routerUser);