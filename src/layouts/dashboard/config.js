import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
// For Petty Cash Overview
import BanknotesIcon from '@heroicons/react/24/solid/BanknotesIcon';
//For Purchase Request, Reimbursment Request, and Advance Request
import PencilSquareIcon from '@heroicons/react/24/solid/PencilSquareIcon';
// For Voucher (all vouchers)
import DocumentIcon from '@heroicons/react/24/solid/DocumentIcon';
// For Purchase Order
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
// For Cash Reimbursment
import CircleStackIcon from '@heroicons/react/24/solid/CircleStackIcon';
// For Cash Advance
import WalletIcon from '@heroicons/react/24/solid/WalletIcon';
//For material request
import ClipboardDocumentListIcon from '@heroicons/react/24/solid/ClipboardDocumentListIcon';
// Expenses
import TableCellsIcon from '@heroicons/react/24/solid/TableCellsIcon';



import { SvgIcon } from '@mui/material';

export const items = [
/*   {
    title: 'Overview',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  }, */
   {
    title: 'Petty Cash Overview',
    path: '/petty-cash',
    icon: (
      <SvgIcon fontSize="small">
        <BanknotesIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Material Request',
    icon: (
      <SvgIcon fontSize="small">
        <ClipboardDocumentListIcon />
      </SvgIcon>
    ),
     subItems: [
      {
        title: 'Purchase Request',
        path: '/materialrequest/purchase-request',
        icon: (
          <SvgIcon fontSize="small">
            <PencilSquareIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Purchase Order',
        path: '/materialrequest/purchase-order',
        icon: (
          <SvgIcon fontSize="small">
            <ShoppingBagIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Voucher',
        path: '/materialrequest/material-voucher',
        icon: (
          <SvgIcon fontSize="small">
            <DocumentIcon />
          </SvgIcon>
        )
      }
    ]
  },
  {
    title: 'Cash Reimbursement',
    icon: (
      <SvgIcon fontSize="small">
        <CircleStackIcon />
      </SvgIcon>
    ),
     subItems: [
      {
        title: 'Reimbursement Request',
        path: '/cashreimbursement/cash-return',
        icon: (
          <SvgIcon fontSize="small">
            <PencilSquareIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Expenses',
        path: '/cashreimbursement/past-expenses',
        icon: (
          <SvgIcon fontSize="small">
            <TableCellsIcon />
          </SvgIcon>
        )
      }
    ]
  },
  {
    title: 'Cash Advance Request',
    icon: (
      <SvgIcon fontSize="small">
        <WalletIcon />
      </SvgIcon>
    ),
     subItems: [
      {
        title: 'Advance Request',
        path: '/cashadvance/cash-request',
        icon: (
          <SvgIcon fontSize="small">
            <PencilSquareIcon />
          </SvgIcon>
        )
      },
/*        {
        title: 'Advance Request',
        path: '/cashadvance/cash-request',
        icon: (
          <SvgIcon fontSize="small">
            <ClipboardDocumentListIcon />
          </SvgIcon>
        )
      }, */
      {
        title: 'Voucher',
        path: '/cashadvance/advance-voucher',
        icon: (
          <SvgIcon fontSize="small">
            <DocumentIcon />
          </SvgIcon>
        )
      }
    ]
  },
  // {
  //   title: 'Companies',
  //   path: '/companies',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <ShoppingBagIcon />
  //     </SvgIcon>
  //   )
  // },
  /* {
    title: 'Account',
    path: '/account',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Login',
    path: '/auth/login',
    icon: (
      <SvgIcon fontSize="small">
        <LockClosedIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Register',
    path: '/auth/register',
    icon: (
      <SvgIcon fontSize="small">
        <UserPlusIcon />
      </SvgIcon>
    )
  }, */
/*   {
    title: 'Error',
    path: '/404',
    icon: (
      <SvgIcon fontSize="small">
        <XCircleIcon />
      </SvgIcon>
    )
  } */
];


