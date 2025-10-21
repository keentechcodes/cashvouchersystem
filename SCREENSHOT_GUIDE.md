# Screenshot Guide for Cash Voucher System

Since automated screenshot tools cannot download browsers in this environment, follow this manual guide to capture screenshots of the application.

## Starting the Application

1. Open a terminal in the project directory
2. Run: `npm start`
3. Wait for all 5 services to start:
   - Frontend: http://localhost:3000
   - Auth Server: http://localhost:3003
   - Petty Cash: http://localhost:3001
   - Cash Advance: http://localhost:3002
   - Main API: http://localhost:5000

## Pages to Screenshot

### Authentication Pages
- Login: http://localhost:3000/auth/login
- Register: http://localhost:3000/auth/register

### Dashboard
- Home/Overview: http://localhost:3000/

### Petty Cash Module
- Petty Cash Overview: http://localhost:3000/petty-cash

### Material Request Module
- Purchase Request: http://localhost:3000/materialrequest/purchase-request
- Purchase Order: http://localhost:3000/materialrequest/purchase-order
- Material Voucher: http://localhost:3000/materialrequest/material-voucher

### Cash Advance Module
- Cash Request: http://localhost:3000/cashadvance/cash-request
- CA Approval: http://localhost:3000/cashadvance/ca-approval
- Advance Voucher: http://localhost:3000/cashadvance/advance-voucher

### Cash Reimbursement Module
- Cash Return: http://localhost:3000/cashreimbursement/cash-return
- Past Expenses: http://localhost:3000/cashreimbursement/past-expenses
- Reimbursement Voucher: http://localhost:3000/cashreimbursement/reimbursement-voucher

### Other Pages
- Account: http://localhost:3000/account
- Customers: http://localhost:3000/customers
- Companies: http://localhost:3000/companies
- Settings: http://localhost:3000/settings

## Login Credentials

**Admin Account:**
- Username: `admin`
- Password: `12345`

## Screenshot Best Practices

1. **Browser**: Use Chrome or Firefox for best compatibility
2. **Resolution**: Use 1920x1080 for desktop screenshots
3. **Browser Tools**: Press F12 to open DevTools and test responsive layouts
4. **Full Page**: Use browser extensions like "Full Page Screen Capture" for long pages
5. **States**: Capture both empty and populated states where applicable

## Manual Screenshot Tools

### Chrome Extensions
- Full Page Screen Capture
- Awesome Screenshot
- Nimbus Screenshot

### Firefox Extensions
- Fireshot
- Awesome Screenshot

### Desktop Tools
- **Windows**: Snipping Tool, Win + Shift + S
- **Mac**: Cmd + Shift + 4
- **Linux**: Spectacle, GNOME Screenshot

## Naming Convention

Save screenshots with descriptive names:
- `01-login-page.png`
- `02-dashboard-overview.png`
- `03-petty-cash-add-cash.png`
- `04-material-request-form.png`
- etc.

## Storage Location

Create a `screenshots/` directory in the project root:
```bash
mkdir -p screenshots
```

Save all screenshots there for documentation purposes.
