require('dns').setServers(['8.8.8.8']);
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const questionPaperRoutes = require('./routes/questionPaperRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/question-papers', questionPaperRoutes);


app.get('/', (req, res) => {
  res.send('Previous Question Paper Repository API is running!');
});

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
