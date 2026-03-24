const { CosmosClient } = require("@azure/cosmos");


const client = new CosmosClient(process.env.COSMOS_DB_CONNECTION);
const database = client.database("miapp-db");
const container = database.container("items");

module.exports = async function (context, req) {
    try {
   
        context.log("Iniciando lectura de items...");

     
        const { resources } = await container.items.readAll().fetchAll();

        context.res = {
            status: 200,
            body: resources
        };
    } catch (error) {
        context.log.error("Error en getItems:", error.message);
        context.res = {
            status: 500,
            body: {
                mensaje: "Error al leer de la base de datos",
                error: error.message
            }
        };
    }
};  