import { MongoClient } from "mongodb";

const mongo = new MongoClient("mongodb://127.0.0.1:27017");
const database = mongo.db("tarefa_cinco");

const termosTiDocument = database.collection("termos_ti");

export { termosTiDocument };
