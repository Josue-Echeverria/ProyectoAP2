const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://hdanielqg:rkyde4mRHsWYGzU7@proyecto2.y96zzh2.mongodb.net/?retryWrites=true&w=majority&appName=Proyecto2";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function deleteEvento(nombre) {
  try {
    await client.connect();
    const database = client.db('proyecto_ap');
    const collection = database.collection('events');
    const query = { nombre: nombre }; 
    const result = await collection.deleteMany(query);
    if (result.deletedCount>0) {
      console.log(`Successfully deleted ${result.deletedCount} document.`);
      await client.close();
      return "Successfully deleted one document.";
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
      await client.close();
      return "No documents matched the query. Deleted 0 documents.";
    }
  } finally {
    await client.close();
  }
}
deleteEvento('Seminario');

