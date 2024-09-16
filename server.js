const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const newsRoutes = require('./routes/newsRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
const MONGO_URL = 'mongodb://localhost:27017/SportsCentral';

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Middleware for static files
app.use(express.static(path.join(__dirname, 'public')));

// Parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session management
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: MONGO_URL }),
  cookie: { maxAge: 180 * 60 * 1000 } // Session valid for 3 hours
}));

// Set view engine to EJS
app.set('view engine', 'ejs');

// Routes
app.use('/auth', authRoutes);
app.use('/contact', contactRoutes);
app.use('/news', newsRoutes);
app.use('/user', userRoutes);

// Default route (dashboard)
app.get('/', (req, res) => {
  res.render('dashboard', { user: req.session.user });
});

// API for storing contact form submissions
app.post('/api/contact', async (req, res) => {
  try {
    const Contact = mongoose.model('Contact', new mongoose.Schema({
      name: String,
      email: String,
      message: String
    }));

    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    await contact.save();

    res.status(200).send('Message stored successfully!');
  } catch (error) {
    console.error('Error storing data:', error);
    res.status(500).send('Error storing data');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
