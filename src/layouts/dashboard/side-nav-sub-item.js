import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';

const SideNavSubItem = ({ title, path, icon, active }) => (
  <ListItem disableGutters>
    <ListItemButton
      component={NextLink}
      href={path}
      sx={{
        color: active ? 'primary.main' : 'text.secondary',
        fontWeight: active ? 500 : 400,
        justifyContent: 'flex-start',
        textTransform: 'none',
        letterSpacing: 0,
        width: '100%',
        borderRadius: 0,
        py: 0,    // Adjust padding vertical
        pl: 3,    // Adjust padding left
        fontSize: '0.25rem',    // Adjust font size
      }}
    >
      {icon && (
        <ListItemIcon>
          {icon}
        </ListItemIcon>
      )}
      <ListItemText primary={title} />
    </ListItemButton>
  </ListItem>
);

SideNavSubItem.propTypes = {
  active: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.element,
};

export default SideNavSubItem;
