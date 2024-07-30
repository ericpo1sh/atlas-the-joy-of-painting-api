const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
dotenv.config()

// DO NOT RUN, UR GONNA BREAK THE DATABSE BUT THIS IS WHAT I DID TO MERGE ALL COLLECTIONS
const url = process.env.MONGO_URL
const dbName = 'CSV';

const colorsCollectionName = 'csv_colors';
const episodesCollectionName = 'csv_episodes';
const subjectsCollectionName = 'csv_subjects';
const newCollectionName = 'mergedCollection';

(async () => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);

    const colorsData = await db.collection(colorsCollectionName).find().toArray();
    const episodesData = await db.collection(episodesCollectionName).find().toArray();
    const subjectsData = await db.collection(subjectsCollectionName).find().toArray();

    const episodesMap = episodesData.reduce((acc, episode) => {
      acc[episode.title] = episode;
      return acc;
    }, {});

    const subjectsMap = subjectsData.reduce((acc, subject) => {
      const title = subject.TITLE.replace(/\"/g, '');
      acc[title] = subject;
      return acc;
    }, {});

    const mergedData = colorsData.map(color => {
      const title = color.painting_title;
      const episode = episodesMap[title] || {};
      const subject = subjectsMap[title.toUpperCase()] || {};

      return {
        ...color,
        ...episode,
        ...subject,
        _id: undefined
      };
    });

    // merging data into new collection
    const newCollection = db.collection(newCollectionName);
    await newCollection.insertMany(mergedData);

    console.log(`Data successfully merged into collection: ${newCollectionName}`);
    client.close();
  } catch (error) {
    console.error(error);
  }
})();
