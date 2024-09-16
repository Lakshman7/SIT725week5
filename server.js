import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Set up __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Route to add two numbers (with missing parameter handling)
app.get('/addTwoNumbers/:firstNumber/:secondNumber?', (req, res) => {
  const firstNumber = parseInt(req.params.firstNumber);
  const secondNumber = req.params.secondNumber ? parseInt(req.params.secondNumber) : null;

  if (isNaN(firstNumber) || secondNumber === null || isNaN(secondNumber)) {
    return res.status(400).json({ result: null, statusCode: 400 });
  }

  const result = firstNumber + secondNumber;
  res.status(200).json({ result: result, statusCode: 200 });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
