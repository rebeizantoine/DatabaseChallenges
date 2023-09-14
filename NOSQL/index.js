const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MongoDB connection URL (replace with your MongoDB Atlas URL)
const mongoURL = 'mongodb+srv://rebeizantoine:rebeizantoine@cluster0.mongodb.net/mydatabase';

// Create a MongoDB client
const client = new MongoClient(mongoURL, { useUnifiedTopology: true });

// Connect to MongoDB
async function connectToMongo() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectToMongo();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Create a new user (POST request)
app.post('/api/users', async (req, res) => {
    try {
        // Access the MongoDB collection (replace 'users' with your actual collection name)
        const collection = client.db().collection('users');

        // Insert the new user document into the collection
        const result = await collection.insertOne(req.body);

        // Send a success response with the inserted user document
        res.status(201).json(result.ops[0]);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
