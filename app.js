require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db'); // make sure this path leads to your db.js file

// import routes
const materialRequestRoutes = require('./routes/materialRequestRoutes');
const pettyCashRoutes = require('./routes/pettyCashRoutes');
const reimbursementRoutes = require('./routes/reimbursementRoutes');

// initialize express app
const app = express();

// use middleware
app.use(cors());
app.use(bodyParser.json());

// apis
app.use('/api/material_requests', materialRequestRoutes);
app.use('/petty-cash', pettyCashRoutes);
app.use('/reimbursements', reimbursementRoutes);

// API endpoint for getting approved orders of material requests
app.get('/approved_orders', async (req, res) => {
  try {
    const approvedOrdersResult = await pool.query(`
      SELECT mr.*, po.id AS purchase_order_id, po.date AS purchase_order_date 
      FROM material_requests mr
      JOIN material_request_purchase_orders po ON mr.id = po.material_request_id
      WHERE mr.status = $1
    `, ['approved']);
    res.status(200).json(approvedOrdersResult.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
});



// start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
