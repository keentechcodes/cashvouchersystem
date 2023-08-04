<<<<<<< HEAD
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs'); // Make sure to import the fs module for file operations
const pool = require('../db');
const router = express.Router();

// Function to generate a unique filename for the uploaded file
function generateFileName() {
  const timestamp = new Date().getTime(); // Get current timestamp
  const randomString = Math.random().toString(36).substring(7); // Generate a random string
  return `${timestamp}-${randomString}`; // Combine timestamp and random string as the filename
}


router.use(bodyParser.json());

// Configure multer for handling file uploads
const upload = multer({ dest: 'uploads/' });

// Route to handle the POST request for adding cash with file upload
router.post('/petty-cash', upload.single('selectedFile'), async (req, res) => {
  try {
    const { amount, dateOfEntry, replenishedBy, cashCategory } = req.body;
    const selectedFile = req.file; // Access the uploaded file from req.file

    // Generate a unique filename for the uploaded file
    const fileName = generateFileName();

    // Move the uploaded file to a specific directory on the server
    const filePath = `uploads/${fileName}`;
    fs.renameSync(selectedFile.path, filePath);

    // Perform the database insertion using the pool.query function
    const query = `
      INSERT INTO add_cash (amount, date_of_entry, replenished_by, receipt_path, cash_category)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [amount, dateOfEntry, replenishedBy, filePath, cashCategory]; // Save the file path in the database
    const result = await pool.query(query, values);

    // Respond with the inserted data (optional)
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

// Route to handle fetching cash entries based on the selected category
router.get('/total-cash-by-category', async (req, res) => {
  try {
    // Perform the database query to calculate the total cash amount by category
    const query = `
      SELECT cash_category, SUM(amount) AS total_cash
      FROM add_cash
      GROUP BY cash_category;
    `;

    const result = await pool.query(query);
    const totalCashByCategory = result.rows;

    res.json(totalCashByCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});


// Route to handle the POST request for recording expenses with file upload
router.post('/record-expenses', upload.single('selectedFile'), async (req, res) => {
  try {
    const { amount, dateOfEntry, expenseCategory, reimbursedBy } = req.body;
    const selectedFile = req.file; // Access the uploaded file from req.file

    // Generate a unique filename for the uploaded file
    const fileName = generateFileName();

    // Move the uploaded file to a specific directory on the server
    const filePath = `uploads/${fileName}`;
    fs.renameSync(selectedFile.path, filePath);

    // Perform the database insertion using the pool.query function
    const query = `
      INSERT INTO record_expenses (amount, date_of_entry, expense_category, reimbursed_by, receipt_path)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [amount, dateOfEntry, expenseCategory, reimbursedBy, filePath]; // Save the file path in the database
    const result = await pool.query(query, values);

    // Respond with the inserted data (optional)
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

// Route to handle fetching the current balance, total, expenses, and charts
router.get('/check-balance', async (req, res) => {
  try {
    const addCashQuery = 'SELECT COALESCE(SUM(amount), 0) AS total_cash FROM add_cash;';
    const expensesQuery = 'SELECT COALESCE(SUM(amount), 0) AS total_expenses FROM record_expenses;';
    const expensesChartSummaryQuery = `
      SELECT expense_category, COUNT(*) as total_expenses
      FROM record_expenses
      GROUP BY expense_category;
    `;

    const [addCashResult, expensesResult, expensesChartSummaryResult] = await Promise.all([
      pool.query(addCashQuery),
      pool.query(expensesQuery),
      pool.query(expensesChartSummaryQuery)
    ]);

    const totalCash = addCashResult.rows[0].total_cash;
    const totalExpenses = expensesResult.rows[0].total_expenses;
    const currentBalance = totalCash - totalExpenses;

    // Extract the chart summary data
    const chartSummaryData = expensesChartSummaryResult.rows;

    res.json({ totalCash, currentBalance, totalExpenses, chartSummaryData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

router.get('/add-cash-entries', async (req, res) => {
  try {
    const query = 'SELECT add_cash_id, cash_category, date_of_entry, amount, replenished_by FROM add_cash ORDER BY date_of_entry DESC';
    const result = await pool.query(query);

    // Send the data as a JSON response
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching add cash entries:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/record-expenses', async (req, res) => {
  try {
    const query = 'SELECT record_expenses_id, expense_category, date_of_entry, amount, reimbursed_by FROM record_expenses ORDER BY date_of_entry DESC';
    const result = await pool.query(query);

    // Send the data as a JSON response
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching record expenses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/delete-cash-entry/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM add_cash WHERE add_cash_id = $1';
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Cash entry not found' });
    }

    return res.json({ message: 'Cash entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting cash entry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/delete-record-expense/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM record_expenses WHERE record_expenses_id = $1';
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Record expense entry not found' });
    }

    return res.json({ message: 'Record expense entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting record expense entry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


=======
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs'); // Make sure to import the fs module for file operations
const pool = require('../db');
const router = express.Router();

// Function to generate a unique filename for the uploaded file
function generateFileName() {
  const timestamp = new Date().getTime(); // Get current timestamp
  const randomString = Math.random().toString(36).substring(7); // Generate a random string
  return `${timestamp}-${randomString}`; // Combine timestamp and random string as the filename
}


router.use(bodyParser.json());

// Configure multer for handling file uploads
const upload = multer({ dest: 'uploads/' });

// Route to handle the POST request for adding cash with file upload
router.post('/petty-cash', upload.single('selectedFile'), async (req, res) => {
  try {
    const { amount, dateOfEntry, replenishedBy, cashCategory } = req.body;
    const selectedFile = req.file; // Access the uploaded file from req.file

    // Generate a unique filename for the uploaded file
    const fileName = generateFileName();

    // Move the uploaded file to a specific directory on the server
    const filePath = `uploads/${fileName}`;
    fs.renameSync(selectedFile.path, filePath);

    // Perform the database insertion using the pool.query function
    const query = `
      INSERT INTO add_cash (amount, date_of_entry, replenished_by, receipt_path, cash_category)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [amount, dateOfEntry, replenishedBy, filePath, cashCategory]; // Save the file path in the database
    const result = await pool.query(query, values);

    // Respond with the inserted data (optional)
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

// Route to handle fetching cash entries based on the selected category
router.get('/total-cash-by-category', async (req, res) => {
  try {
    // Perform the database query to calculate the total cash amount by category
    const query = `
      SELECT cash_category, SUM(amount) AS total_cash
      FROM add_cash
      GROUP BY cash_category;
    `;

    const result = await pool.query(query);
    const totalCashByCategory = result.rows;

    res.json(totalCashByCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});


// Route to handle the POST request for recording expenses with file upload
router.post('/record-expenses', upload.single('selectedFile'), async (req, res) => {
  try {
    const { amount, dateOfEntry, expenseCategory, reimbursedBy } = req.body;
    const selectedFile = req.file; // Access the uploaded file from req.file

    // Generate a unique filename for the uploaded file
    const fileName = generateFileName();

    // Move the uploaded file to a specific directory on the server
    const filePath = `uploads/${fileName}`;
    fs.renameSync(selectedFile.path, filePath);

    // Perform the database insertion using the pool.query function
    const query = `
      INSERT INTO record_expenses (amount, date_of_entry, expense_category, reimbursed_by, receipt_path)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [amount, dateOfEntry, expenseCategory, reimbursedBy, filePath]; // Save the file path in the database
    const result = await pool.query(query, values);

    // Respond with the inserted data (optional)
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

// Route to handle fetching the current balance, total, expenses, and charts
router.get('/check-balance', async (req, res) => {
  try {
    const addCashQuery = 'SELECT COALESCE(SUM(amount), 0) AS total_cash FROM add_cash;';
    const expensesQuery = 'SELECT COALESCE(SUM(amount), 0) AS total_expenses FROM record_expenses;';
    const expensesChartSummaryQuery = `
      SELECT expense_category, COUNT(*) as total_expenses
      FROM record_expenses
      GROUP BY expense_category;
    `;

    const [addCashResult, expensesResult, expensesChartSummaryResult] = await Promise.all([
      pool.query(addCashQuery),
      pool.query(expensesQuery),
      pool.query(expensesChartSummaryQuery)
    ]);

    const totalCash = addCashResult.rows[0].total_cash;
    const totalExpenses = expensesResult.rows[0].total_expenses;
    const currentBalance = totalCash - totalExpenses;

    // Extract the chart summary data
    const chartSummaryData = expensesChartSummaryResult.rows;

    res.json({ totalCash, currentBalance, totalExpenses, chartSummaryData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

router.get('/add-cash-entries', async (req, res) => {
  try {
    const query = 'SELECT add_cash_id, cash_category, date_of_entry, amount, replenished_by FROM add_cash ORDER BY date_of_entry DESC';
    const result = await pool.query(query);

    // Send the data as a JSON response
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching add cash entries:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/record-expenses', async (req, res) => {
  try {
    const query = 'SELECT record_expenses_id, expense_category, date_of_entry, amount, reimbursed_by FROM record_expenses ORDER BY date_of_entry DESC';
    const result = await pool.query(query);

    // Send the data as a JSON response
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching record expenses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/delete-cash-entry/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM add_cash WHERE add_cash_id = $1';
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Cash entry not found' });
    }

    return res.json({ message: 'Cash entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting cash entry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/delete-record-expense/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM record_expenses WHERE record_expenses_id = $1';
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Record expense entry not found' });
    }

    return res.json({ message: 'Record expense entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting record expense entry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


>>>>>>> f2c0da94f41ff23ab30a6bedc8aec818b4da28de
module.exports = router;