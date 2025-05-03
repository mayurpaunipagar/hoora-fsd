const { MongoClient } = require('mongodb');
const moment = require('moment');
const crypto = require('crypto');

// Simple UUID generator
function generateUUID() {
  return crypto.randomBytes(16).toString('hex');
}

// Simple product name generator
function generateProductName() {
  const products = ['Book', 'Laptop', 'Phone', 'Shirt', 'Chair', 'Lamp', 'Pen', 'Bag'];
  const adjectives = ['Red', 'Blue', 'Smart', 'Classic', 'Modern', 'Portable', 'Light', 'Durable'];
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${products[Math.floor(Math.random() * products.length)]}`;
}

// Simple price generator
function generatePrice() {
  return (Math.random() * (1000 - 10) + 10).toFixed(2);
}

// Simple full name generator
function generateFullName() {
  const firstNames = ['John', 'Jane', 'Alex', 'Emily', 'Michael', 'Sarah', 'David', 'Laura'];
  const lastNames = ['Smith', 'Johnson', 'Brown', 'Taylor', 'Wilson', 'Davis', 'Clark', 'Lewis'];
  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${first} ${last}`;
}

async function insertOneMillionRecords() {
  const uri = 'mongodb://localhost:27017/fullstack'; // Replace with your MongoDB connection string
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db('test'); // Replace with your database name
    const collection = db.collection('users10'); // Replace with your collection name

    const batchSize = 10000; // Insert in batches to optimize performance
    const totalRecords = 1000000;

    console.log('Generating and inserting 1 million records...');

    for (let i = 0; i < totalRecords; i += batchSize) {
      const batch = [];

      // Generate batch of records
      for (let j = 0; j < batchSize && i + j < totalRecords; j++) {
        const recordIndex = i + j;
        // Calculate days to subtract: 0 for first record, 1 for second, up to 999,999 for millionth
        const daysToSubtract = Math.floor((recordIndex / (totalRecords - 1)) * (totalRecords - 1));
        const recordDate = moment().subtract(daysToSubtract, 'days').toDate();

        const record = {
          userId: generateUUID(),
          fullname: generateFullName(),
          items: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => ({
            itemId: generateUUID(),
            name: generateProductName(),
            price: generatePrice()
          })),
          createdAt: recordDate
        };
        batch.push(record);
      }

      // Insert batch
      try {
        const x = await collection.insertMany(batch);
        console.log("my x:", x);
      } catch (e) {
        console.log(e);
      }
      console.log(`Inserted ${i + batch.length} records...`);
    }

    console.log('Successfully inserted 1 million records!');
  } catch (error) {
    console.error('Error inserting records:', error);
  } finally {
    await client.close();
  }
}

// Express API setup
const express = require('express');
const app = express();
const port = 4000;

app.use(express.json());

app.post('/insert-one-million', async (req, res) => {
  try {
    await insertOneMillionRecords();
    res.status(200).json({ message: 'Successfully inserted 1 million records' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to insert records' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});