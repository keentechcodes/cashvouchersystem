<<<<<<< HEAD
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3002; // Replace with your desired port number

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cashvouchersystem',
  password: 'secretpassword',
  port: 5432, // Replace with your PostgreSQL port number if necessary
});

app.post('/api/submit-cash-advance', async (req, res) => {
    try {
      const { name, dateBorrowed, designation, amount, terms, note, customTerms } = req.body;
  
      // Set customTerms to null if it's empty or undefined
      const customTermsValue = customTerms ? customTerms : null;
  
      // Perform the database insertion using the pool.query function
      const query = `
        INSERT INTO cash_advance_requests (name, date_borrowed, designation, amount, terms, note, custom_terms)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
      `;
      const values = [name, dateBorrowed, designation, amount, terms, note, customTermsValue];
      const result = await pool.query(query, values);
  
      // Respond with the inserted data (optional)
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong!' });
    }
  });

  // Add a new endpoint to fetch all cash advance requests
app.get('/api/cash-advance-requests', async (req, res) => {
    try {
      // Perform the database query to fetch all cash advance requests
      const query = `
        SELECT * FROM cash_advance_requests;
      `;
      const result = await pool.query(query);
  
      // Respond with the fetched data
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong!' });
    }
  });

  app.put('/api/cash-advance-requests/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      // Perform the database update using the pool.query function
      const query = `
        UPDATE cash_advance_requests
        SET status = $1
        WHERE id = $2
        RETURNING *;
      `;
      const values = [status, id];
      const result = await pool.query(query, values);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Cash advance request not found.' });
      }
  
      // Respond with the updated data
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong!' });
    }
  });
  
  // Add a new endpoint to update the status of a cash advance request to "Disapproved" by ID
app.put('/api/cash-advance-requests/:id/disapprove', async (req, res) => {
  try {
    const { id } = req.params;

    // Perform the database update to set the status to "Disapproved"
    const query = `
      UPDATE cash_advance_requests
      SET status = 'Disapproved'
      WHERE id = $1
      RETURNING *;
    `;
    const values = [id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cash advance request not found.' });
    }

    // Respond with the updated data
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  
=======
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3002; // Replace with your desired port number

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cashvouchersystem',
  password: '12345',
  port: 5432, // Replace with your PostgreSQL port number if necessary
});

app.post('/api/submit-cash-advance', async (req, res) => {
    try {
      const { name, dateBorrowed, designation, amount, terms, note, customTerms } = req.body;
  
      // Set customTerms to null if it's empty or undefined
      const customTermsValue = customTerms ? customTerms : null;
  
      // Perform the database insertion using the pool.query function
      const query = `
        INSERT INTO cash_advance_requests (name, date_borrowed, designation, amount, terms, note, custom_terms)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
      `;
      const values = [name, dateBorrowed, designation, amount, terms, note, customTermsValue];
      const result = await pool.query(query, values);
  
      // Respond with the inserted data (optional)
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong!' });
    }
  });

  // Add a new endpoint to fetch all cash advance requests
app.get('/api/cash-advance-requests', async (req, res) => {
    try {
      // Perform the database query to fetch all cash advance requests
      const query = `
        SELECT * FROM cash_advance_requests;
      `;
      const result = await pool.query(query);
  
      // Respond with the fetched data
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong!' });
    }
  });

  app.put('/api/cash-advance-requests/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      // Perform the database update using the pool.query function
      const query = `
        UPDATE cash_advance_requests
        SET status = $1
        WHERE id = $2
        RETURNING *;
      `;
      const values = [status, id];
      const result = await pool.query(query, values);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Cash advance request not found.' });
      }
  
      // Respond with the updated data
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong!' });
    }
  });
  
  // Add a new endpoint to update the status of a cash advance request to "Disapproved" by ID
app.put('/api/cash-advance-requests/:id/disapprove', async (req, res) => {
  try {
    const { id } = req.params;

    // Perform the database update to set the status to "Disapproved"
    const query = `
      UPDATE cash_advance_requests
      SET status = 'Disapproved'
      WHERE id = $1
      RETURNING *;
    `;
    const values = [id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cash advance request not found.' });
    }

    // Respond with the updated data
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  
>>>>>>> f2c0da94f41ff23ab30a6bedc8aec818b4da28de
