import express from "express";
import bcrypt from "bcrypt";
import pool from "../db.js";

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).send("All fields are required.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", [username, email, hashedPassword]);
        
        res.redirect("/login");
    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).send("Error: " + err.message);
    }
});

// Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Email and password are required.");
        }

        const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (rows.length === 0) {
            return res.status(401).send("User not found.");
        }

        const user = rows[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.render('auth', { title: 'Login / Sign Up', error: "Incorrect password." });
        }

        req.session.userId = user.id;
        res.redirect("/tasks");
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).send("Error: " + err.message);
    }
});

export default router;
