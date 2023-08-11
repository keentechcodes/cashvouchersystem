const fs = require('fs').promises;
const { generateCashVoucher } = require('./VoucherPDF');

const sampleData = {
  requestNo: "12345",
  place: "Place",
  voucherNo: "V-001",
  date: "01/01/2023",
  requestedBy: "John Doe",
  designation: "Designation",
  branch: "Main Branch",
  reason: "Sample Reason",
  receivedStatement: "This Person",
  approvedBy: "",
  By: "Person By",
  particulars: [
    { name: "Item1", amount: 50 },
    { name: "Item2", amount: 1500 }
    //... more data as required
  ]
};

generateCashVoucher(sampleData)
  .then(pdfBytes => {
    return fs.writeFile('output.pdf', pdfBytes);
  })
  .then(() => {
    console.log("PDF saved as output.pdf");
  })
  .catch(error => {
    console.error("Error generating PDF:", error);
  });
