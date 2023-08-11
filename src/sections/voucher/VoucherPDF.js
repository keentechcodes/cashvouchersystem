const { PDFDocument, rgb } = require('pdf-lib');
const fontkit = require(`fontkit`);

async function fetchArrayBuffer(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}. Status: ${response.status}`);
  }
  return await response.arrayBuffer();
}

function numberToWords(amount) {
    const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const teens = ["", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    
    function convertToWords(num) {
        if (num < 10) return units[num];
        if (num > 10 && num < 20) return teens[num - 10];
        if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? " " + units[num % 10] : "");
        if (num < 1000) return units[Math.floor(num / 100)] + " Hundred" + (num % 100 !== 0 ? " and " + convertToWords(num % 100) : "");
        return "";
    }

    let pesos = Math.floor(amount);
    let centavos = Math.round((amount - pesos) * 100);

    let word = "";
    if (pesos > 0) {
        if (Math.floor(pesos / 1000) > 0) {
            word += convertToWords(Math.floor(pesos / 1000)) + " Thousand";
            pesos %= 1000;
        }
        if (pesos > 0) {
            if (word !== "") word += " and ";
            word += convertToWords(pesos);
        }
    }

    if (centavos > 0) {
        if (word !== "") word += " and ";
        word += convertToWords(centavos) + " Centavo" + (centavos > 1 ? "s" : "");
    }

    return word || "Zero"; 
  }

function formatDate(inputDate) {
    const date = new Date(inputDate);
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
}


const generateCashVoucher = async (data) => {
  // Load the existing PDF template
  const existingPdfBytes = await fetchArrayBuffer('/assets/voucherfiles/CashVoucherTemplate.pdf');
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  
  // Register fontkit
  pdfDoc.registerFontkit(fontkit);
  
  // Embed the Arial font
   const arialFontBytes = await fetchArrayBuffer('/assets/voucherfiles/ARIAL.TTF');
  const font = await pdfDoc.embedFont(arialFontBytes);

   // Extract the first page of your template
  const page = pdfDoc.getPages()[0];
  
  // The rest of your code remains unchanged ...

  const color = rgb(0, 0, 0); // Black color

  // Define the helper function inside generateCashVoucher
  function drawTextConditionally(data, options) {
    if (data !== undefined && data !== null && data.toString().trim() !== '') {
        page.drawText(data.toString(), options);
    }
  }

// Fill in the template with data at specified positions
drawTextConditionally(`${data.requestNo}`, { x: 135, y: 540, size: 16, font, color });

drawTextConditionally(`${data.place}`, { x: 105, y: 521, size: 16, font, color });
drawTextConditionally(`${data.voucherNo}`, { x: 665, y: 540, size: 16, font, color });
const formattedDate = formatDate(data.date);
drawTextConditionally(formattedDate, { x: 657, y: 521, size: 16, font, color });


drawTextConditionally(`${data.requestedBy}`, { x: 150, y: 481, size: 16, font, color });
drawTextConditionally(`${data.designation}`, { x: 504, y: 481, size: 16, font, color });
drawTextConditionally(`${data.branch}`, { x: 656, y: 481, size: 16, font, color });
drawTextConditionally(`${data.reason}`, { x: 140, y: 461, size: 16, font, color });

// Drawing the table for particulars
let yPos = 380; // Starting y position for table (adjusted a bit considering the title above)
data.particulars.forEach(item => {
    drawTextConditionally(item.name, { x: 80, y: yPos, size: 14, font, color });
    drawTextConditionally(`₱${item.amount.toString()}`, { x: 620, y: yPos, size: 14, font, color });
    yPos -= 20; // Move down for next row
});

// Calculate total and add it
const total = data.particulars.reduce((sum, item) => sum + Number(item.amount), 0);
drawTextConditionally(`${total}`, { x: 620, y: 185, size: 16, font, color });

drawTextConditionally(`${data.receivedStatement}`, { x: 504, y: 160.5, size: 16, font, color });
drawTextConditionally(`${total}`, { x: 685, y: 140, size: 16, font, color });
const totalwords = numberToWords(total);
drawTextConditionally(`${totalwords}`, { x: 374, y: 140, size: 12, font, color });

drawTextConditionally(`${data.approvedBy}`, { x: 96, y: 122, size: 16, font, color });

drawTextConditionally(`${data.By}`, { x: 635, y: 61, size: 16, font, color });


  // Serialize PDF document to bytes
  return await pdfDoc.save();

/*   // Serialize PDF document to bytes
  const pdfBytes = await pdfDoc.save();

  // Create blob and download (this might vary based on the framework you're using)
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'CashVoucher.pdf';
  link.click(); */
};

module.exports = { generateCashVoucher };
