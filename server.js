const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

// MongoDB connection URL and database name, do not modify.
const url = 'mongodb+srv://root:root@cluster0.7mbnhsc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'CSV';
const collectionName = 'mergedCollection';

const app = express();
const port = 3000;

app.use(cors());

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
let db;

client.connect().then(() => {
  db = client.db(dbName);
  console.log('Connected to MongoDB');
}).catch(err => console.error(err));

app.get('/data', async (req, res) => {
  try {
    const { month, subjects, colors } = req.query;
    const filter = {};

    if (month) {
      filter.month = month;
    }

    if (subjects) {
      const subjectFilters = subjects.split(',').reduce((acc, subject) => {
        acc[subject] = 1; // indicates that it has the subject
        return acc;
      }, {});
      Object.assign(filter, subjectFilters);
    }

    if (colors) {
      const colorFilters = colors.split(',').reduce((acc, color) => {
        acc[color] = 1;
        return acc;
      }, {});
      Object.assign(filter, colorFilters);
    }

    const results = await db.collection(collectionName).find(filter).toArray();

    // selecting fields to display on table
    const response = results.map(result => ({
      season_episode: `S${result.season}E${result.episode}`,
      painting_title: result.painting_title,
      month: result.month,
      day: result.day,
      year: result.year,
      youtube_src: result.youtube_src
    }));

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
