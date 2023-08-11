const axios = require('axios');
const VoucherPDF = require('../voucher/VoucherPDF');


const generateMaterialPDF = async (voucherId) => {
    try {
        // 1. Fetch data for the given voucherId
        const response = await axios.get(`http://localhost:5000/api/material_requests/voucher/${voucherId}/data`);

        if (response.status !== 200) {
            throw new Error('Failed to fetch voucher data');
        }

        const allItems = response.data;

        // Extract common data from the first item
        const firstItem = allItems[0];

        // 2. Prepare the data for VoucherPDF
        const preparedData = {
            requestNo: firstItem.material_request_id,  // Changed based on your data
            place: "",  // Placeholder as before
            voucherNo: firstItem.id,  // Using 'id' based on your data
            date: firstItem.date,
            requestedBy: firstItem.requestor,
            designation: firstItem.designation,
            branch: firstItem.branch,
            reason: firstItem.reason,
            receivedStatement: "",  // Placeholder as before
            approvedBy: "",  // Placeholder as before
            By: "",  // Placeholder as before
            particulars: allItems.map(item => ({
                name: `${item.qty} ${item.unit} ${item.specification}`,
                amount: item.amount
            }))
        };

        // 3. Use VoucherPDF.js to generate the PDF
        const pdfBuffer = VoucherPDF.generateCashVoucher(preparedData);
        return pdfBuffer;

    } catch (error) {
        console.error('Error generating material PDF:', error);
        throw error;
    }
}

module.exports = generateMaterialPDF;
