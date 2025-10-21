# Cash Voucher System

A comprehensive financial management system for tracking petty cash, material requests, cash advances, and expense reimbursements. Built with Next.js, React, and PostgreSQL, this system provides a complete workflow solution for organizational financial operations.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
- [Workflows](#workflows)
- [Security Notes](#security-notes)
- [Contributing](#contributing)
- [License](#license)

## Features

### Petty Cash Management
- Add cash entries with receipt uploads
- Record expenses with categorization
- Real-time balance tracking (total cash - total expenses)
- Category-based reporting and analytics
- File upload support for documentation
- View and manage cash entries and expense records

### Material Request Workflow
- Create material requests with multiple line items
- Specify quantities, units, and specifications for each item
- Admin approval/disapproval system
- Automatic purchase order generation upon approval
- Convert purchase orders to vouchers
- PDF voucher generation
- Track request history and status

### Cash Advance Request System
- Submit cash advance requests with specified terms
- Admin approval/disapproval capability
- Salary deduction tracking
- Payment terms management (fixed or custom duration)
- Status visibility for requesters
- Personal request history

### Cash Reimbursement System
- Multi-level location tracking (area → main location → sub-location)
- Period-based reimbursement tracking
- Expense categorization by type and transportation method
- Hierarchical data structure for complex reimbursements
- Comprehensive expense reporting

## Technology Stack

### Frontend
- **Next.js 13.1.6** - React framework with SSR support
- **React 18.2.0** - UI library
- **Material-UI (MUI) 5.11.10** - Component library and design system
- **Formik 2.2.9** - Form state management and validation
- **Yup 1.0.0** - Schema validation
- **Axios 1.4.0** - HTTP client
- **ApexCharts 3.37.0** - Data visualization and charting
- **react-pdf 7.3.3** - PDF rendering
- **pdf-lib 1.17.1** - PDF generation and manipulation
- **date-fns 2.29.3** - Date utilities
- **Emotion** - CSS-in-JS styling

### Backend
- **Node.js** - JavaScript runtime
- **Express 4.18.2** - Web framework
- **PostgreSQL** - Relational database
- **pg 8.11.1** - PostgreSQL client for Node.js
- **jsonwebtoken 9.0.1** - JWT authentication
- **multer 1.4.5-lts.1** - File upload handling
- **CORS 2.8.5** - Cross-origin resource sharing
- **dotenv 16.3.1** - Environment variable management

### Development Tools
- **Concurrently 8.2.0** - Run multiple processes
- **Nodemon** - Auto-restart server on changes
- **ESLint 8.34.0** - Code linting
- **Jest 29.6.2** - Testing framework

## Prerequisites

Before installing, ensure you have the following:

- **Node.js** (v14.x or higher)
- **npm** or **yarn** package manager
- **PostgreSQL** (v12 or higher)
- **Git** for version control

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cashvouchersystem
```

2. Install dependencies:
```bash
npm install
```

3. Create environment configuration:
```bash
# Create .env file in the root directory
touch .env
```

4. Configure environment variables in `.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=cashvouchersystem
DB_USER=postgres
DB_PASSWORD=your_password_here
```

## Database Setup

1. Create the PostgreSQL database:
```bash
psql -U postgres
CREATE DATABASE cashvouchersystem;
\q
```

2. Initialize the database schema:
```bash
cd server
psql -U postgres -d cashvouchersystem -f database.sql
```

The database includes the following main tables:
- `users` - User authentication and information
- `add_cash` - Petty cash entries
- `record_expenses` - Expense records
- `material_requests` - Material request parent records
- `material_request_items` - Line items for material requests
- `material_request_purchase_orders` - Generated purchase orders
- `material_request_vouchers` - Vouchers for approved purchases
- `cash_advance_requests` - Cash advance requests
- `reimbursements_requests` - Reimbursement parent records
- `reimbursements_main_locations` - Main location tracking
- `reimbursements_sub_locations` - Sub-location tracking
- `reimbursements_expenses` - Individual expense items

3. Default admin credentials (as per database.sql):
```
Username: admin
Password: 12345
```

## Running the Application

### Start All Services
The system runs 5 concurrent services:

```bash
npm start
```

This starts:
- **Frontend** (Next.js) on `http://localhost:3000`
- **Authentication Server** on `http://localhost:3003`
- **Petty Cash Service** on `http://localhost:3001`
- **Cash Advance Service** on `http://localhost:3002`
- **Main API Server** on `http://localhost:5000` (Material requests & reimbursements)

### Development Mode
For development with hot-reload:

```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run export
```

## Project Structure

```
cashvouchersystem/
├── src/                          # Frontend source code
│   ├── components/               # Reusable UI components
│   ├── contexts/                 # React Context providers
│   │   ├── auth-context.js       # Authentication state
│   │   ├── RequestsContext.js    # Request management
│   │   └── VoucherContext.js     # Voucher management
│   ├── guards/                   # Route protection
│   ├── hocs/                     # Higher-order components
│   ├── hooks/                    # Custom React hooks
│   ├── layouts/                  # Page layouts
│   │   ├── auth/                 # Authentication layout
│   │   └── dashboard/            # Main dashboard layout
│   ├── pages/                    # Next.js pages (routes)
│   │   ├── auth/                 # Login and registration
│   │   ├── petty-cash.js         # Petty cash management
│   │   ├── cashadvance/          # Cash advance pages
│   │   ├── cashreimbursement/    # Reimbursement pages
│   │   └── materialrequest/      # Material request pages
│   ├── sections/                 # Feature-specific components
│   │   ├── petty-cash/           # Petty cash components
│   │   ├── materialrequest/      # Material request components
│   │   ├── advancerequest/       # Cash advance components
│   │   └── reimbursementrequest/ # Reimbursement components
│   ├── theme/                    # Material-UI theme
│   └── utils/                    # Utility functions
├── routes/                       # API route handlers
├── server/                       # Database configuration
│   └── database.sql              # Database schema
├── uploads/                      # File upload storage
├── app.js                        # Main API server (port 5000)
├── check-login.js                # Authentication server (port 3003)
├── pettyCashRoutes.js            # Petty cash server (port 3001)
├── cashAdvanceRoutes.js          # Cash advance server (port 3002)
├── db.js                         # Database connection pool
├── package.json                  # Project dependencies
├── .env                          # Environment variables
└── next.config.js                # Next.js configuration
```

## Authentication

### JWT-Based Authentication Flow

1. User submits credentials via login form
2. Frontend sends POST request to `http://localhost:3003/login`
3. Server verifies credentials against PostgreSQL users table
4. Server issues JWT token with 1-hour expiration
5. Token stored in localStorage as `authToken`
6. Token included in Authorization header for protected requests

### Protected Routes

All dashboard routes require authentication:
- Material request pages
- Cash advance pages
- Petty cash pages
- Reimbursement pages

Only `/auth/login` and `/auth/register` are publicly accessible.

### Authorization Header Format
```
Authorization: Bearer <token>
```

### Role-Based Access

Basic admin detection by user ID:
- User ID 1 is considered admin
- Admin users can approve/disapprove requests
- Regular users can only submit and view their own requests

## API Endpoints

### Authentication Server (Port 3003)
- `POST /login` - Authenticate user and issue JWT
- `POST /validateToken` - Verify and validate JWT token

### Petty Cash Service (Port 3001)
- `POST /petty-cash` - Add cash with file upload
- `POST /record-expenses` - Record expense with file upload
- `GET /check-balance` - Get balance summary
- `GET /add-cash-entries` - List all cash entries
- `GET /record-expenses` - List all expenses
- `GET /total-cash-by-category` - Summary by category
- `DELETE /delete-cash-entry/:id` - Delete cash entry
- `DELETE /delete-record-expense/:id` - Delete expense record

### Cash Advance Service (Port 3002)
- `POST /api/submit-cash-advance` - Submit cash advance request
- `GET /api/cash-advance-requests` - Get all requests
- `GET /api/cash-advance-requests/:name` - Get user-specific requests
- `PUT /api/cash-advance-requests/:id` - Update request status
- `PUT /api/cash-advance-requests/:id/disapprove` - Disapprove request

### Material Request API (Port 5000)
- `POST /api/material_requests` - Create material request
- `GET /api/material_requests` - Get all requests with items and POs
- `PUT /api/material_requests/:id/approve` - Approve and create purchase order
- `PUT /api/material_requests/:id/disapprove` - Disapprove and delete PO
- `PUT /api/material_requests/po/:id/convert` - Convert PO to voucher
- `GET /api/material_requests/vouchers` - Get all vouchers
- `GET /api/material_requests/voucher/:id/pdf` - Generate PDF voucher
- `DELETE /api/material_requests/:id` - Delete request

### Reimbursement API (Port 5000)
- `POST /reimbursements` - Create reimbursement request
- `GET /reimbursements` - Get all reimbursements with hierarchy
- `GET /reimbursements/:id` - Get specific reimbursement with full data

## Workflows

### Material Request Workflow

1. **Create Request**
   - Employee fills MaterialRequestForm with items
   - Each item includes quantity, unit, specification, and amount
   - Submit creates request with status="pending"

2. **Admin Review**
   - Admin views all pending requests
   - Can approve or disapprove each request

3. **Approval Process**
   - Upon approval, status updates to "approved"
   - Purchase order automatically created

4. **Purchase Order to Voucher**
   - Admin converts approved PO to voucher
   - Voucher becomes available for PDF download

5. **PDF Generation**
   - Click to generate PDF voucher
   - Includes all request details and line items

### Petty Cash Workflow

1. **Add Cash**
   - Fill form with amount, category, and replenisher name
   - Upload receipt image/document
   - File stored in `/uploads` with unique timestamp

2. **Record Expenses**
   - Fill form with amount, category, and requestor
   - Upload supporting documentation
   - Expense recorded and deducted from balance

3. **Check Balance**
   - View real-time balance (total cash - total expenses)
   - See breakdown by category
   - View charts and analytics

### Cash Advance Workflow

1. **Submit Request**
   - Employee fills form with amount and terms
   - Terms can be standard (weekly/bi-weekly/monthly) or custom
   - Request submitted with pending status

2. **Admin Approval**
   - Admin views all pending requests
   - Approves or disapproves each request

3. **Track Status**
   - Employees view their request status
   - Approved requests show in voucher section

## Security Notes

### Important Security Considerations

1. **Password Storage**: Currently, passwords are stored in plain text. **This is a critical security vulnerability.** For production use, implement bcrypt or similar hashing:
   ```bash
   npm install bcrypt
   ```

2. **Token Storage**: JWT tokens are stored in localStorage. Consider using httpOnly cookies for enhanced security.

3. **Environment Variables**: Never commit `.env` file to version control. Add it to `.gitignore`.

4. **File Uploads**: Implement file type validation and size limits in production.

5. **SQL Injection**: Current implementation uses parameterized queries, which is good. Continue this practice.

6. **CORS Configuration**: Currently allows all origins in development. Restrict to specific domains in production.

### Recommended Production Security Enhancements

- Implement bcrypt for password hashing
- Use httpOnly cookies for token storage
- Add rate limiting for API endpoints
- Implement file type and size validation
- Add input sanitization
- Enable HTTPS/TLS
- Implement proper error handling (don't expose stack traces)
- Add audit logging for sensitive operations
- Implement role-based access control (RBAC)
- Use environment-specific configurations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues, questions, or contributions, please contact the development team.

---

**Note**: This system is designed for internal organizational use. Ensure proper security measures are implemented before deploying to production environments.
