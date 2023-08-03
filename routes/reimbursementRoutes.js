const express = require('express');
const router = express.Router();
const pool = require('../db'); // assuming you have db.js file that sets up connection with the database


router.post('/', async (req, res) => {
  const { area, periodStart, periodEnd, today, fields } = req.body;
  
  try {
    // Start a transaction
    await pool.query('BEGIN');

    const result = await pool.query(
      `INSERT INTO reimbursements_requests (area, period_start, period_end, today) VALUES ($1, $2, $3, $4) RETURNING id`,
      [area, periodStart, periodEnd, today]
    );

    const reimbursementRequestId = result.rows[0].id;

    for (let field of fields) {
      const resultLocation = await pool.query(
        `INSERT INTO reimbursements_main_locations (reimbursement_request_id, location_name, date) VALUES ($1, $2, $3) RETURNING id`,
        [reimbursementRequestId, field.mainLocation, field.date]
      );

      const mainLocationId = resultLocation.rows[0].id;

      for (let subLocation of field.subLocations) {
        const resultSubLocation = await pool.query(
          `INSERT INTO reimbursements_sub_locations (main_location_id, sub_location_name) VALUES ($1, $2) RETURNING id`,
          [mainLocationId, subLocation.subLocationName]
        );

        const subLocationId = resultSubLocation.rows[0].id;

        for (let expense of subLocation.expenses) {
          await pool.query(
            `INSERT INTO reimbursements_expenses (sub_location_id, expense_type, transportation_type, expense_amount) VALUES ($1, $2, $3, $4)`,
            [subLocationId, expense.expenseType, expense.transportationType, expense.expenseAmount]
          );
        }
      }
    }

    // If everything goes well, commit the transaction
    await pool.query('COMMIT');

    res.status(201).json({ id: reimbursementRequestId });
  } catch (err) {
    // If anything goes wrong, rollback the transaction
    await pool.query('ROLLBACK');

    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const resultReimbursementsRequests = await pool.query(
      `SELECT * FROM reimbursements_requests`
    );

    const reimbursements = resultReimbursementsRequests.rows;

    for (let reimbursement of reimbursements) {
      const resultMainLocations = await pool.query(
        `SELECT * FROM reimbursements_main_locations WHERE reimbursement_request_id = $1`,
        [reimbursement.id]
      );

      reimbursement.mainLocations = resultMainLocations.rows;

      for (let mainLocation of reimbursement.mainLocations) {
        const resultSubLocations = await pool.query(
          `SELECT * FROM reimbursements_sub_locations WHERE main_location_id = $1`,
          [mainLocation.id]
        );

        mainLocation.subLocations = resultSubLocations.rows;

        for (let subLocation of mainLocation.subLocations) {
          const resultExpenses = await pool.query(
            `SELECT * FROM reimbursements_expenses WHERE sub_location_id = $1`,
            [subLocation.id]
          );

          subLocation.expenses = resultExpenses.rows;
        }
      }
    }

    res.status(200).json(reimbursements);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch reimbursements_requests
    const resultReimbursementsRequests = await pool.query(
      `SELECT * FROM reimbursements_requests WHERE id = $1`,
      [id]
    );

    const reimbursementRequest = resultReimbursementsRequests.rows[0];

    // Fetch reimbursements_main_locations
    const resultMainLocations = await pool.query(
      `SELECT * FROM reimbursements_main_locations WHERE reimbursement_request_id = $1`,
      [id]
    );

    const mainLocations = resultMainLocations.rows;

    for (let mainLocation of mainLocations) {
      // Fetch reimbursements_sub_locations
      const resultSubLocations = await pool.query(
        `SELECT * FROM reimbursements_sub_locations WHERE main_location_id = $1`,
        [mainLocation.id]
      );

      mainLocation.subLocations = resultSubLocations.rows;

      for (let subLocation of mainLocation.subLocations) {
        // Fetch reimbursements_expenses
        const resultExpenses = await pool.query(
          `SELECT * FROM reimbursements_expenses WHERE sub_location_id = $1`,
          [subLocation.id]
        );

        subLocation.expenses = resultExpenses.rows;
      }
    }

    reimbursementRequest.mainLocations = mainLocations;

    res.status(200).json(reimbursementRequest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
