import { generateCashVoucher } from './VoucherPDF.js';
import fs from 'fs';

describe('VoucherPDF', () => {
    it('should generate a PDF', async () => {
        const data = {
            requestNo: '12345',
            particulars: [
                { name: 'Particular 1', amount: 100 },
                { name: 'Particular 2', amount: 150 },
                // ... add more mock items as needed ...
            ],
            // ... fill in the rest of the mock data ...
        };

        const result = await generateCashVoucher(data);

        // This is a basic test just to ensure some bytes are returned. 
        // More complex tests would be needed for real-world scenarios.
        expect(result).toBeTruthy();
    });
});
