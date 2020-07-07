// importando dependencias
const Express = require("express");
const { connect } = require("mongoose");

// llamando al
const { agenda } = require("./schema.js");
const FakeData = require("./fakeData.json");

const Server = Express();

// Parametros de conexion
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const DATA_BASE = "workshop";
const APP_PORT = process.env.PORT || 3000;

// Preparando cadena de conexion
const CONECTOR = `mongodb+srv://${USER}:${PASSWORD}@mycluster.hdgiq.gcp.mongodb.net/${DATA_BASE}?retryWrites=true&w=majority`;
const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// Router para crear datos de manera aleatoria
Server.use("/random", (request, response) => {
    const { protocol, hostname } = request;
    // Se consiguen los nodos del archivo FakeData
    const { names, lastNames } = FakeData;
    // Consiguiendo un index de manera aleatoria
    const NAME = Math.floor(Math.random() * (names.length - 0));
    const LAST_NAME = Math.floor(Math.random() * (lastNames.length - 0));
    // Preparando los datos que seran enviados a mongodb
    const DATA = {
        name: names[NAME],
        lastName: lastNames[LAST_NAME],
        age: NAME * 2,
        random: NAME * LAST_NAME,
        domain: `${protocol}://${hostname}/`,
    };

    // Se indica que se crea un nuevo registro
    c
    // Se recibe la respuesta generada al crear un nuevo registro.
    AGEMDA.save((error, data) => {
        // En caso de error mostramos el problem
        if (error) {
            response.status(404);
            response.json(error);
        } else {
            // en caso de que todo salga correcto enviamos la respuesta.
            response.status(200);
            response.json(data);
        }
    });
});

// Routere para consultar todos los datos generados.
Server.use("/", (request, response) => {
    // Generamos una busqueda completa.
    agenda.find({}, (error, data) => {
        // En caso de error mostramos el problema
        if (error) {
            response.status(404);
            response.json(error);
        } else {
            // en caso de que todo salga correcto enviamos la respuesta.
            response.status(200);
            response.json(data);
        }
    });
});

// Abriendo la conexión a mongoDB Atlas
connect(
    CONECTOR,
    OPTIONS,
    MongoError => {
        // si algo sale mal mostramos el error y paramos el servidor
        if (MongoError) {
            console.error(MongoError);
            process.exit(1);
        }
        // se inicia el servidor
        Server.listen(APP_PORT, error => {
            // En caso de error indicamos el problemas
            if (error) {
                console.error(error);
                process.exit(1);
            }
            console.log("Conexión establecida con MongoDB Altas");
            console.log("Servidor listo");
        });
    }
);
