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
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'YOUR_SECRET_KEY';


// Function to retrieve user data from the database based on username and password
async function getUserData(username) {
  try {
    const query = 'SELECT * FROM users WHERE username = $1';
    const values = [username];
    const result = await pool.query(query, values);

    if (result.rowCount === 1) {
      const userData = result.rows[0];
      return userData;
    } else {
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
    const token = jwt.sign({ username: userData.username }, SECRET_KEY, { expiresIn: '1h' });
    console.log('Login successful:', userData.username);
    return res.status(200).json({ isAuthenticated: true, token, user: userData }); // Add userData in the response
  } else {
    console.log('Invalid credentials');
    return res.status(401).json({ isAuthenticated: false });
  }
});


app.post('/validateToken', async (req, res) => {
  console.log("Validating token...");

  const authHeader = req.headers.authorization;
  if (!authHeader) {
      console.error("Authorization header missing");
      return res.status(401).send("Authorization header missing");
  }

  const token = authHeader.split(' ')[1];
  console.log(`Received token: ${token.substring(0, 15)}...`); // Logs the beginning of the token for brevity
  
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(`Token decoded successfully for user: ${decoded.username}`);

    // Fetch user data using the username from the decoded payload
    const userData = await getUserData(decoded.username);
    if(userData) {
        console.log(`User data retrieved for user: ${decoded.username}`);
        res.json(userData);
    } else {
        console.error(`Invalid token or user ${decoded.username} does not exist`);
        res.status(401).send("Invalid token or user does not exist");
    }      
  } catch (error) {
      console.error("Error validating token:", error);
      res.status(401).send("Invalid token");
  }
});




app.listen(port, () => console.log(`Server is running on port ${port}`));