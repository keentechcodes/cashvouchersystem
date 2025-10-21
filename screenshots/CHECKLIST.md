# Screenshot Checklist

## Prerequisites
- [ ] Application is running (`npm start`)
- [ ] Logged in as admin (username: admin, password: 12345)

## Screenshots to Capture

### Authentication (2 screenshots)
- [ ] `01-login-page.png` - Login page (http://localhost:3000/auth/login)
- [ ] `02-register-page.png` - Registration page (http://localhost:3000/auth/register)

### Dashboard (1 screenshot)
- [ ] `03-dashboard-home.png` - Dashboard overview (http://localhost:3000/)

### Petty Cash Module (1 screenshot)
- [ ] `04-petty-cash.png` - Petty cash overview (http://localhost:3000/petty-cash)

### Material Request Module (3 screenshots)
- [ ] `05-material-purchase-request.png` - Purchase request form (http://localhost:3000/materialrequest/purchase-request)
- [ ] `06-material-purchase-order.png` - Purchase orders (http://localhost:3000/materialrequest/purchase-order)
- [ ] `07-material-voucher.png` - Material vouchers (http://localhost:3000/materialrequest/material-voucher)

### Cash Advance Module (3 screenshots)
- [ ] `08-cash-advance-request.png` - Cash advance form (http://localhost:3000/cashadvance/cash-request)
- [ ] `09-cash-advance-approval.png` - Approval page (http://localhost:3000/cashadvance/ca-approval)
- [ ] `10-cash-advance-voucher.png` - Advance vouchers (http://localhost:3000/cashadvance/advance-voucher)

### Cash Reimbursement Module (3 screenshots)
- [ ] `11-cash-return.png` - Cash return form (http://localhost:3000/cashreimbursement/cash-return)
- [ ] `12-past-expenses.png` - Past expenses (http://localhost:3000/cashreimbursement/past-expenses)
- [ ] `13-reimbursement-voucher.png` - Reimbursement vouchers (http://localhost:3000/cashreimbursement/reimbursement-voucher)

### Other Pages (4 screenshots)
- [ ] `14-account.png` - Account settings (http://localhost:3000/account)
- [ ] `15-customers.png` - Customers page (http://localhost:3000/customers)
- [ ] `16-companies.png` - Companies page (http://localhost:3000/companies)
- [ ] `17-settings.png` - Settings page (http://localhost:3000/settings)

## Instructions

1. Start the application: `npm start`
2. Visit each URL above
3. Take a screenshot using your browser's built-in tools or extensions
4. Save with the exact filename shown
5. Place all screenshots in the `screenshots/` folder

## Browser Screenshot Methods

**Chrome/Edge:**
- Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
- Type "screenshot"
- Select "Capture full size screenshot"

**Firefox:**
- Press `Shift+F2`
- Type `screenshot --fullpage filename.png`

**Any Browser Extensions:**
- Full Page Screen Capture
- Awesome Screenshot
- Fireshot
