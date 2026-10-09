const express = require('express');
const { sql } = require('@vercel/postgres');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Initialize Database Table
app.post('/api/init-db', async (req, res) => {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS guests (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255),
                attending BOOLEAN,
                guests_count INTEGER DEFAULT 1,
                message TEXT,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `;
        res.status(200).json({ message: 'Database initialized successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to initialize database' });
    }
});

// Submit RSVP
app.post('/api/rsvp', async (req, res) => {
    const { name, email, attending, guests_count, message } = req.body;
    
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    try {
        await sql`
            INSERT INTO guests (name, email, attending, guests_count, message)
            VALUES (${name}, ${email}, ${attending}, ${guests_count}, ${message})
        `;
        res.status(201).json({ message: 'RSVP saved successfully' });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Failed to save RSVP' });
    }
});

// Get all guests (Optional: For you to view later)
app.get('/api/guests', async (req, res) => {
    try {
        const { rows } = await sql`SELECT * FROM guests ORDER BY created_at DESC;`;
        res.status(200).json(rows);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Failed to fetch guests' });
    }
});

// Vercel Serverless Export
module.exports = app;

// Local Development Server
if (require.main === module) {
    const path = require('path');
    
    // Serve static files from the project root
    app.use(express.static(path.join(__dirname, '..')));
    
    // Route the main URL to the HTML file
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'index.html'));
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running locally on http://localhost:${port}`);
    });
}
