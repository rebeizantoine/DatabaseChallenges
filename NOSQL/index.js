const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const mongoURL = 'mongodb+srv://rebeizantoine:rebeizantoine@cluster0.mongodb.net/mydatabase';

const client = new MongoClient(mongoURL, { useUnifiedTopology: true });

async function connectToMongo() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectToMongo();

app.use(bodyParser.json());

app.post('/api/users', async (req, res) => {
    try {
        const collection = client.db().collection('users');

        const result = await collection.insertOne(req.body);

        res.status(201).json(result.ops[0]);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
