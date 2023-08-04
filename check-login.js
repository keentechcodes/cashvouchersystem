const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cashvouchersystem',
  password: '12345',
  port: 5432,
});

const app = express();
const port = 3003;
app.use(cors());

app.use(express.json());

// Function to retrieve user data from the database based on username and password
// Function to retrieve user data from the database based on username and password
async function getUserData(username, password) {
  try {
    const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
    const values = [username, password];
    const result = await pool.query(query, values);

    if (result.rowCount === 1) {
      // User credentials are valid, fetch all values from the table for that user
      const userData = result.rows[0];
      return userData;
    } else {
      // User credentials are invalid, return null
      return null;
    }
  } catch (error) {
    console.error('Error while retrieving user data:', error);
    throw error;
  }
}



// Middleware to check the user's authentication status
async function checkAuthentication(req, res, next) {
  const { username, password } = req.body;
  try {
    // Get user data from the database based on username and password
    const userData = await getUserData(username, password);

    if (userData) {
      // User credentials are valid, set isAuthenticated to true in the response
      req.isAuthenticated = true;
      req.userData = userData;
      console.log('User data retrieved from the database:', userData); // Log the retrieved user data
    } else {
      // User credentials are invalid, set isAuthenticated to false in the response
      req.isAuthenticated = false;
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
}

app.post('/login', checkAuthentication, (req, res) => {
  const isAuthenticated = req.isAuthenticated;
  const userData = req.userData;

  if (isAuthenticated) {
    // User credentials are valid
    console.log('Login successful:', userData.username);
    return res.status(200).json({ isAuthenticated: true, userData });
  } else {
    // User credentials are invalid
    console.log('Invalid credentials');
    return res.status(401).json({ isAuthenticated: false });
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));

