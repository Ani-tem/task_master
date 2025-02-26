import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Require authentication for task routes
const requireAuth = (req, res, next) => {
    if (!req.session.userId) return res.redirect('/login');
    next();
};

// Get all tasks for the logged-in user
router.get('/tasks', requireAuth, async (req, res) => {
    try {
        const { rows } = await pool.query(
            'SELECT * FROM tasks WHERE user_id = $1 ORDER BY due_date ASC',
            [req.session.userId]
        );
        res.render('tasks', { tasks: rows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching tasks');
    }
});

// Show form to create a new task
router.get('/tasks/new', requireAuth, (req, res) => {
    res.render('new-task');
});

// Create a new task
router.post('/tasks', requireAuth, async (req, res) => {
    const { title, description, category, priority, due_date } = req.body;
    const formattedDueDate = due_date || null; // Convert empty string to NULL

    try {
        await pool.query(
            `INSERT INTO tasks (user_id, title, description, category, priority, due_date) 
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [req.session.userId, title, description, category, priority, formattedDueDate]
        );
        res.redirect('/tasks');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating task');
    }
});

// Edit a task (Show form)
router.get('/tasks/:id/edit', requireAuth, async (req, res) => {
    try {
        const { rows } = await pool.query(
            'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
            [req.params.id, req.session.userId]
        );
        if (rows.length === 0) return res.status(404).send('Task not found');
        res.render('edit-task', { task: rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching task');
    }
});

// Update a task
router.post('/tasks/:id', requireAuth, async (req, res) => {
    const { title, description, category, priority, due_date, completed } = req.body;
    const formattedDueDate = due_date || null; // Convert empty string to NULL
    
    try {
        await pool.query(
            `UPDATE tasks SET title = $1, description = $2, category = $3, 
             priority = $4, due_date = $5, completed = $6 
             WHERE id = $7 AND user_id = $8`,
            [title, description, category, priority, formattedDueDate, completed, req.params.id, req.session.userId]
        );
        res.redirect('/tasks');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating task');
    }
});

// Delete a task
router.post('/tasks/:id/delete', requireAuth, async (req, res) => {
    try {
        await pool.query(
            'DELETE FROM tasks WHERE id = $1 AND user_id = $2',
            [req.params.id, req.session.userId]
        );
        res.redirect('/tasks');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting task');
    }
});

export default router;
