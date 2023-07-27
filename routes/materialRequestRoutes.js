const express = require('express');
const router = express.Router();
const pool = require('../db'); // assuming you have db.js file that sets up connection with the database

router.post('/', async (req, res) => {
  const { requestor, date, designation, branch, reason, items, total } = req.body;
  try {
    const requestResult = await pool.query(
      'INSERT INTO material_requests (requestor, date, designation, branch, reason, total) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [requestor, date, designation, branch, reason, total]
    );
    const requestId = requestResult.rows[0].id;
    for (let item of items) {
      await pool.query(
        'INSERT INTO material_request_items (material_request_id, qty, unit, specification, amount) VALUES ($1, $2, $3, $4, $5)',
        [requestId, item.qty, item.unit, item.specification, item.amount]
      );
    }
    res.status(201).json({ id: requestId });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const requestsResult = await pool.query('SELECT * FROM material_requests');
    const itemsResult = await pool.query('SELECT * FROM material_request_items');
    
    const itemsById = itemsResult.rows.reduce((obj, item) => {
      if (!obj[item.material_request_id]) {
        obj[item.material_request_id] = [];
      }
      obj[item.material_request_id].push(item);
      return obj;
    }, {});

    const requestsWithItems = requestsResult.rows.map(request => ({
      ...request,
      items: itemsById[request.id] || []
    }));

    res.status(200).json(requestsWithItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const requestResult = await pool.query('SELECT * FROM material_requests WHERE id = $1', [id]);
    if (requestResult.rows.length > 0) {
      const request = requestResult.rows[0];
      const itemsResult = await pool.query('SELECT * FROM material_request_items WHERE material_request_id = $1', [id]);
      res.status(200).json({ ...request, items: itemsResult.rows });
    } else {
      res.status(404).json({ message: "Material request not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
});


router.put('/:id/approve', async (req, res) => {
  const { id } = req.params;
  try {
    // Mark the material request as approved
    const updateResult = await pool.query('UPDATE material_requests SET status = $1 WHERE id = $2', ['approved', id]);
    if (updateResult.rowCount === 0) {
      res.status(404).json({ message: "Material request not found" });
      return;
    }

    // Create a new purchase order
    const poResult = await pool.query('INSERT INTO material_request_purchase_orders (material_request_id, date) VALUES ($1, NOW()) RETURNING id', [id]);
    const poId = poResult.rows[0].id;

    // Also, update the status of the order to "approved"
    await pool.query('UPDATE material_requests SET status = $1 WHERE id = $2', ['approved', id]);

    res.status(200).json({ poId: poId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/po/:id/convert', async (req, res) => {
  const { id } = req.params;
  try {
    // Check if the purchase order exists
    const checkResult = await pool.query('SELECT * FROM material_request_purchase_orders WHERE id = $1', [id]);
    if (checkResult.rows.length === 0) {
      res.status(404).json({ message: "Purchase order not found" });
      return;
    }

    // Create a new voucher
    const voucherResult = await pool.query('INSERT INTO material_request_vouchers (purchase_order_id, date) VALUES ($1, NOW()) RETURNING id', [id]);
    const voucherId = voucherResult.rows[0].id;

    res.status(200).json({ voucherId: voucherId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleteResult = await pool.query(
      'DELETE FROM material_requests WHERE id = $1 RETURNING *', // 'RETURNING *' will return the deleted row
      [id]
    );
    if (deleteResult.rowCount === 0) { // If no rows were deleted
      res.status(404).json({ message: "Material request not found" });
    } else {
      res.status(200).json({ message: "Material request deleted", deletedRequest: deleteResult.rows[0] });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


  router.put('/:id/disapprove', async (req, res) => {
  const { id } = req.params;
  try {
    // Mark the material request as disapproved
    const updateResult = await pool.query('UPDATE material_requests SET status = $1 WHERE id = $2', ['disapproved', id]);
    if (updateResult.rowCount === 0) {
      res.status(404).json({ message: "Material request not found" });
      return;
    }

    // Delete the corresponding purchase order if exists
    await pool.query('DELETE FROM material_request_purchase_orders WHERE material_request_id = $1', [id]);
  
    res.status(200).json({ message: 'Material request has been disapproved and corresponding purchase order deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

  router.get('/purchase_orders', async (req, res) => {
  try {
    // Fetch the purchase orders along with the associated material request
    const poResult = await pool.query(`
      SELECT po.*, mr.* 
      FROM material_request_purchase_orders po 
      LEFT JOIN material_requests mr 
      ON po.material_request_id = mr.id
    `);
    res.status(200).json(poResult.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
