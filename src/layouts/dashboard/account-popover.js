import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
<<<<<<< HEAD
import { useAuth } from 'src/hooks/use-auth'; // Import useAuthContext
=======
import { useAuth } from 'src/hooks/use-auth';
>>>>>>> f2c0da94f41ff23ab30a6bedc8aec818b4da28de

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const router = useRouter();
<<<<<<< HEAD
  const { user, signOut } = useAuth(); // Access the user data and signOut function from the authentication context

  console.log('user:', user); // Log the user data to see if it's available
  console.log('open:', open); // Log the value of the "open" prop

  const handleSignOut = useCallback(
    () => {
      console.log('Sign out clicked'); // Log that the Sign out button is clicked
      onClose?.();
      signOut(); // Call the signOut function
      router.push('/auth/login');
    },
    [onClose, signOut, router]
=======
  const auth = useAuth();

  const handleSignOut = useCallback(
    () => {
      onClose?.();
      auth.signOut();
      router.push('/auth/login');
    },
    [onClose, auth, router]
>>>>>>> f2c0da94f41ff23ab30a6bedc8aec818b4da28de
  );

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Account
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
<<<<<<< HEAD
          {user && user.username} {/* Display the username of the authenticated user */}
=======
          Anika Visser
>>>>>>> f2c0da94f41ff23ab30a6bedc8aec818b4da28de
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem onClick={handleSignOut}>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
