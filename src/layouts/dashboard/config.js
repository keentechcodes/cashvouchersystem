import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import ClipboardDocumentListIcon from '@heroicons/react/24/solid/ClipboardDocumentListIcon';



import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Overview',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
   {
    title: 'Petty Cash System',
    path: '/petty-cash',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Material Request',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
     subItems: [
      {
        title: 'Purchase Request',
        path: '/materialrequest/purchase-request',
        icon: (
          <SvgIcon fontSize="small">
            <ClipboardDocumentListIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Purchase Order',
        path: '/materialrequest/purchase-order',
        icon: (
          <SvgIcon fontSize="small">
            <ClipboardDocumentListIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Voucher',
        path: '/materialrequest/material-voucher',
        icon: (
          <SvgIcon fontSize="small">
            <ClipboardDocumentListIcon />
          </SvgIcon>
        )
      }
    ]
  },
  {
    title: 'Cash Reimbursement',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
     subItems: [
      {
        title: 'Reimbursement Request',
        path: '/cashreimbursement/cash-return',
        icon: (
          <SvgIcon fontSize="small">
            <ClipboardDocumentListIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Voucher',
        path: '/cashreimbursement/reimbursement-voucher',
        icon: (
          <SvgIcon fontSize="small">
            <ClipboardDocumentListIcon />
          </SvgIcon>
        )
      }
    ]
  },
  {
    title: 'Cash Advance',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
     subItems: [
      {
        title: 'Advance Request',
        path: '/cashadvance/cash-request',
        icon: (
          <SvgIcon fontSize="small">
            <ClipboardDocumentListIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Voucher',
        path: '/cashadvance/advance-voucher',
        icon: (
          <SvgIcon fontSize="small">
            <ClipboardDocumentListIcon />
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
  {
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
  },
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


