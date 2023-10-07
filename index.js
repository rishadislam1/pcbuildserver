const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://pcbuilder:yfD7jAj4eDXyqC77@cluster0.izzbewl.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const db = client.db('pcbuilder');
    const componentCollection = db.collection('pccomponents');
    const pcBuildCollection = db.collection('pcbuild');

    app.get('/allComponents', async (req, res) => {
      const components = await componentCollection.find({}).toArray();
      
      res.send({ message: "success", status: 200, data: components });
    });

    app.get('/allComponents/:id', async (req, res) => {
      const id = req.params.id;

      const components = await componentCollection.findOne({_id: new ObjectId(id)})
      
        res.send({ message: "success", status: 200, data: components });
    });

    app.get('/cpuApi', async (req, res) => {
      const components = await componentCollection.find({Category: 'CPU / Processor'}).toArray();
      
      res.send({ message: "success", status: 200, data: components });
    });

    app.get('/getUserPcBuild', async (req, res) => {
      const components = await pcBuildCollection.find({}).toArray();
      
        res.send({ message: "success", status: 200, data: components });
    });

    app.get('/monitorApi', async (req, res) => {
      const components = await componentCollection.find({Category: 'Monitor'}).toArray();
      
      res.send({ message: "success", status: 200, data: components });
    });

    app.get('/motherboardApi', async (req, res) => {
      const components = await componentCollection.find({Category: 'Motherboard'}).toArray();
      
      res.send({ message: "success", status: 200, data: components });
    });

    app.get('/pcrandom', async (req, res) => {
      const components = await componentCollection.aggregate([{ $sample: { size: 6 } }]).toArray();
        res.send({ message: "success", status: 200, data: components });
    });

    app.get('/powerApi', async (req, res) => {
      const components = await componentCollection.find({Category: 'Power Supply Unit'}).toArray();
      
      res.send({ message: "success", status: 200, data: components });
    });

    app.get('/ramApi', async (req, res) => {
      const components = await componentCollection.find({Category: 'RAM'}).toArray();
      
      res.send({ message: "success", status: 200, data: components });
    });

    app.get('/storageApi', async (req, res) => {
      const components = await componentCollection.find({Category: 'Storage Device'}).toArray();
      
      res.send({ message: "success", status: 200, data: components });
    });

    
    app.delete('/deletepc/:email', async (req, res) => {
      const email = req.params.email;

      const components = await pcBuildCollection.deleteMany({userEmail: email})
      
        res.send({ message: "success", status: 200, data: components });
    });


  app.post('/userpcbuild', async (req, res) => {
    const book = req.body;

    const result = await pcBuildCollection.insertOne(book);

    res.send(result);
  });
  

 
  

  } finally {
  }
};

run().catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`BookShop listening on port ${port}`);
});
