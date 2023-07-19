import PropTypes from 'prop-types';
import { Collapse, List, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import { useState } from 'react';
import SideNavSubItem from './side-nav-sub-item';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const SideNavItemWithSub = ({ title, path, icon, subItems, active }) => {
  const [open, setOpen] = useState(active);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
        {open ? <ExpandMoreIcon /> : <ChevronRightIcon />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {subItems.map((item) => (
            <SideNavSubItem
              key={item.title}
              title={item.title}
              path={item.path}
              icon={item.icon}
              active={path === item.path}
            />
          ))}
        </List>
      </Collapse>
    </div>
  );
};

SideNavItemWithSub.propTypes = {
  active: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.element,
  subItems: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    icon: PropTypes.element,
  })).isRequired,
};

export default SideNavItemWithSub;
