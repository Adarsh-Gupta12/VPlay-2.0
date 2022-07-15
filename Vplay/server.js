require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
//self files import

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const gameRoutes = require('./routes/games');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const app = express();

//middleware
app.use(cors());
app.use(express.json()); //parse json
//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/games', gameRoutes);

const uri = "mongodb://localhost:27017/vplay2";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('DB Atlas Connected');
});

//serve for heroku
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
