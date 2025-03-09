Rutas de Autenticación:

**POST /api/users/register**

Permite registrar nuevos organizadores de eventos.

Ruta: http://localhost:4600/api/users/register

Request:

``` JSON
{
  "username": "organizador1",
  "password": "hashed_password"
}
```

Response:

``` JSON
{
    "success": true,
    "message": "El usuario se ha registrado correctamente",
    "data": {
        "username": "organizador1",
        "password": "$2b$10$q9wvXAA85IZR.FDk2PIAYuSAqaQaY0WG2nly8w213H9CbCsu1z.gO",
        "_id": "67cdb49d5dd2bbb8c749e8e5",
        "__v": 0
    }
}
```
En el caso de intentar crear un usuario ya existente en la bbdd, nos dará esta respuesta.

Response:

```JSON
{
  "success": false,
  "message": "El usuario ya existe en la base de datos"
}
```

**POST /api/users/login**

Permite a los usuarios autenticarse.

Ruta: http://localhost:4600/api/users/login

Request:

``` JSON
{
  "username": "organizador1",
  "password": "hashed_password"
}
```

Response:

``` JSON
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjdjZGI0OWQ1ZGQyYmJiOGM3NDllOGU1IiwidXNlcl91c2VybmFtZSI6Im9yZ2FuaXphZG9yMSIsInVzZXJfcGFzc3dvcmQiOiIkMmIkMTAkcTl3dlhBQTg1SVpSLkZEazJQSUFZdVNBcWFRYVkwV0cybmx5OHcyMTNIOUNiQ3N1MXouZ08iLCJpYXQiOjE3NDE1MzUwMTEsImV4cCI6MTc0MTUzODYxMX0.6HTjpnDEG6cC-eEDvMj_O-mI6MgiEQNguSg19A4313o"
}
```
En el caso de intentar iniciar sesión con un usuario que previamente no se ha registrado, devolverá la siguiente respuesta.

Request:

``` JSON
{
  "username": "organizador2",
  "password": "hashed_password"
}
```

Response:

``` JSON
{
  "success": false,
  "message": "El usuario indicado no existe"
}
```

**GET /api/users/profile**

Devuelve la información del usuario autenticado.

En la parte de **Auth / Bearer** le indicamos el token generado anteriormente por el usuario.

``` JSON
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjdjZGI0OWQ1ZGQyYmJiOGM3NDllOGU1IiwidXNlcl91c2VybmFtZSI6Im9yZ2FuaXphZG9yMSIsInVzZXJfcGFzc3dvcmQiOiIkMmIkMTAkcTl3dlhBQTg1SVpSLkZEazJQSUFZdVNBcWFRYVkwV0cybmx5OHcyMTNIOUNiQ3N1MXouZ08iLCJpYXQiOjE3NDE1MzUwMTEsImV4cCI6MTc0MTUzODYxMX0.6HTjpnDEG6cC-eEDvMj_O-mI6MgiEQNguSg19A4313o"
}
```
Response:

``` JSON
{
  "success": true,
  "data": {
    "_id": "67cdb49d5dd2bbb8c749e8e5",
    "username": "organizador1",
    "password": "$2b$10$q9wvXAA85IZR.FDk2PIAYuSAqaQaY0WG2nly8w213H9CbCsu1z.gO",
    "__v": 0
  }
}
```

Rutas para Gestión de Eventos:

**GET /api/events/list**

Devuelve una lista de todos los eventos deportivos. 

**¡IMPORTANTE!**

Se le ha añadido el nombre list a la ruta para que no tenga conflictos con el resto de rutas get de nuestro fichero.

Response:

``` JSON
{
  "message": "Mostrando el listado de todos los eventos",
  "events": [
    {
      "_id": "67cd9d9e7ae153ca45b00b67",
      "nombre": "Maratón de Primavera",
      "descripcion": "Carrera de 10km por la ciudad.",
      "fecha": "2023-09-15T00:00:00.000Z",
      "ubicacion": "Madrid",
      "tipoDeporte": "Atletismo",
      "organizador": [
        {
          "_id": "67cb326cecf39594066a27fd",
          "username": "Cristina1",
          "password": "$2b$10$kHli7SjLgdB1/iFLFxLzBeaonpgLM.MZ1jSxrrm4rcuzYLuwL75N6",
          "__v": 0
        }
      ],
      "__v": 0
    },
    {
      "_id": "67cd9ded7ae153ca45b00b6b",
      "nombre": "Zumba",
      "descripcion": "Clase de zumba para mover el esqueleto",
      "fecha": "2025-03-03T00:00:00.000Z",
      "ubicacion": "Madrid",
      "tipoDeporte": "Fitness",
      "organizador": [
        {
          "_id": "67cb326cecf39594066a27fd",
          "username": "Cristina1",
          "password": "$2b$10$kHli7SjLgdB1/iFLFxLzBeaonpgLM.MZ1jSxrrm4rcuzYLuwL75N6",
          "__v": 0
        }
      ],
      "__v": 0
    },
    {
      "_id": "67cd9e227ae153ca45b00b6f",
      "nombre": "Bodycombat",
      "descripcion": "Clase donde aprenceras artes marciales sin saco",
      "fecha": "2025-04-03T00:00:00.000Z",
      "ubicacion": "Madrid",
      "tipoDeporte": "Fitness",
      "organizador": [
        {
          "_id": "67cb326cecf39594066a27fd",
          "username": "Cristina1",
          "password": "$2b$10$kHli7SjLgdB1/iFLFxLzBeaonpgLM.MZ1jSxrrm4rcuzYLuwL75N6",
          "__v": 0
        }
      ],
      "__v": 0
    }
  ]
}
```

En el caso de que la tabla events este vacía, devolverá el siguiente mensaje:

Response:

``` JSON
{
  "success": false,
  "message": "No hay eventos disponibles"
}
```

**GET /api/events/:eventId**

Devuelve los detalles de un evento específico por su ID.

Ruta: http://localhost:4600/api/events/67cd9d9e7ae153ca45b00b67

Response:

``` JSON
{
  "_id": "67cd9d9e7ae153ca45b00b67",
  "nombre": "Maratón de Primavera",
  "descripcion": "Carrera de 10km por la ciudad.",
  "fecha": "2023-09-15T00:00:00.000Z",
  "ubicacion": "Madrid",
  "tipoDeporte": "Atletismo",
  "organizador": [
    "67cb326cecf39594066a27fd"
  ],
  "__v": 0
}
```

En el caso de que el evento no exista, devolverá:

Response:

``` JSON
{
  "message": "Evento no encontrado"
}
```
O en el caso de enviarle un ID incorrecto nos devolverá:

Ruta: http://localhost:4600/api/events/67cd9d9e7ae153ca45b00b67

Response:

``` JSON
{
  "message": "ID no válido"
}
```

**POST /api/events**

Permite crear un nuevo evento deportivo.

Request:

``` JSON
{
  "nombre": "Maratón de Primavera",
  "descripcion": "Carrera de 10km por la ciudad.",
  "fecha": "2025-09-20",
  "ubicacion": "Madrid",
  "tipoDeporte": "Atletismo"
}
```

Response:

``` JSON
{
  "message": "El evento se ha creado correctamente",
  "event": {
    "nombre": "Maratón de Primavera",
    "descripcion": "Carrera de 10km por la ciudad.",
    "fecha": "2025-09-20T00:00:00.000Z",
    "ubicacion": "Madrid",
    "tipoDeporte": "Atletismo",
    "organizador": [
      "67cdb49d5dd2bbb8c749e8e5"
    ],
    "_id": "67cdbb274e499fa074a87937",
    "__v": 0
  }
}
```

En el caso de querer crear un evento ya existente en la bbdd, nos devolverá:

Response:

``` JSON
{
  "message": "Ya existe un evento con los mismos detalles"
}
```

**PUT /api/events/:eventId**

Permite actualizar un evento existente. 

Ruta: http://localhost:4600/api/events/67cdbb274e499fa074a87937

Request:

``` JSON
{
  "nombre": "Maratón de Primavera - Modificada"
}
```

Response:

``` JSON
{
  "message": "Evento actualizado con éxito",
  "data": {
    "_id": "67cdbb274e499fa074a87937",
    "nombre": "Maratón de Primavera - Modificada",
    "descripcion": "Carrera de 10km por la ciudad.",
    "fecha": "2025-09-20T00:00:00.000Z",
    "ubicacion": "Madrid",
    "tipoDeporte": "Atletismo",
    "organizador": [
      "67cdb49d5dd2bbb8c749e8e5"
    ],
    "__v": 0
  }
}
```

**DELETE /api/events/:eventId**

Elimina un evento específico.

Ruta: http://localhost:4600/api/events/67cdbb274e499fa074a87937

Response:

``` JSON
{
  "message": "Evento eliminado con éxito"
}
```

Rutas para Consulta Avanzada de Eventos:

**¡IMPORTANTE!**

Para poder ejecutar estos métodos, es necesario que previamente comentemos el método **GET /api/events/:eventId** ya que al usar varios metodos get con mismo nombre puede dar conflictos.

**GET /api/events/upcoming**

Devuelve una lista de eventos próximos, ordenados por fecha.

Response:

``` JSON
[
  {
    "_id": "67cd9e227ae153ca45b00b6f",
    "nombre": "Bodycombat",
    "descripcion": "Clase donde aprenceras artes marciales sin saco",
    "fecha": "2025-04-03T00:00:00.000Z",
    "ubicacion": "Madrid",
    "tipoDeporte": "Fitness",
    "organizador": [
      "67cb326cecf39594066a27fd"
    ],
    "__v": 0
  }
]
```

**GET /api/events?type=**

Permite filtrar eventos por tipo de deporte.

Ruta: http://localhost:4600/api/events?type=fitness

Response:

``` JSON
[
  {
    "_id": "67cd9ded7ae153ca45b00b6b",
    "nombre": "Zumba",
    "descripcion": "Clase de zumba para mover el esqueleto",
    "fecha": "2025-03-03T00:00:00.000Z",
    "ubicacion": "Madrid",
    "tipoDeporte": "Fitness",
    "organizador": [
      "67cb326cecf39594066a27fd"
    ],
    "__v": 0
  },
  {
    "_id": "67cd9e227ae153ca45b00b6f",
    "nombre": "Bodycombat",
    "descripcion": "Clase donde aprenceras artes marciales sin saco",
    "fecha": "2025-04-03T00:00:00.000Z",
    "ubicacion": "Madrid",
    "tipoDeporte": "Fitness",
    "organizador": [
      "67cb326cecf39594066a27fd"
    ],
    "__v": 0
  }
]
```
En el caso de indicarles un tipo que no existe en la bbdd, nos devolverá:

Ruta: http://localhost:4600/api/events?type=Gym

Response:

``` JSON
{
  "message": "No hay eventos de tipo Gym"
}
```

**GET /api/events/date?from=2023-09-10&to=2023-09-20**

Devuelve los eventos dentro del rango de fechas especificado.

Ruta: http://localhost:4600/api/events/date?from=2023-09-10&to=2023-09-20

Response:

``` JSON
[
  {
    "_id": "67cd9d9e7ae153ca45b00b67",
    "nombre": "Maratón de Primavera",
    "descripcion": "Carrera de 10km por la ciudad.",
    "fecha": "2023-09-15T00:00:00.000Z",
    "ubicacion": "Madrid",
    "tipoDeporte": "Atletismo",
    "organizador": [
      "67cb326cecf39594066a27fd"
    ],
    "__v": 0
  }
]
```

En el caso de no introducir los parámetros from o to en la url, nos devolverá:

Ruta: http://localhost:4600/api/events/date?from=2023-09-10

Response:

``` JSON
{
  "message": "Se deben proporcionar las fechas 'from' y 'to'"
}
```