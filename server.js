import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import pool from './db.js';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false
}));

// Set view engine
app.set('view engine', 'ejs');

// Global user variable for views
app.use((req, res, next) => {
    res.locals.user = req.session.userId || null;
    next();
});

// Authentication middleware
const requireAuth = (req, res, next) => {
    if (!req.session.userId) return res.redirect('/login');
    next();
};

// Routes
app.use(authRoutes);
app.use(taskRoutes);

// Homepage
app.get('/', (req, res) => res.render('auth', { title: 'Login / Sign Up' }));

// Protected Dashboard Route
app.get('/dashboard', requireAuth, (req, res) => {
    res.render('dashboard', { title: 'Dashboard' });
});

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.redirect('/dashboard');
        res.redirect('/login');
    });
});

// Test Database Connection
const testDatabaseConnection = async () => {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('Database connected:', result.rows[0]);
    } catch (err) {
        console.error('Database connection error:', err);
    }
};

testDatabaseConnection();

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
