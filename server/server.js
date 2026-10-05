const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/AuthRoutes');

const app = express();


app.use(cors());
app.use(express.json()); 

app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
  res.send('Backend works!');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/myapp')
  .then(() => {
    console.log('✅ MongoDB подключена');
    app.listen(PORT, () => console.log(`🚀 Сервер запущен на порту ${PORT}`));
  })
  .catch((err) => console.error('❌ Ошибка подключения к базе:', err));