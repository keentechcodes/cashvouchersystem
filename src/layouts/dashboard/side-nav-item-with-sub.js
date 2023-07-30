import PropTypes from 'prop-types';
import { Collapse, List, Box, ButtonBase } from '@mui/material';
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
      <li>
        <ButtonBase
          onClick={handleClick}
          sx={{
            alignItems: 'center',
            borderRadius: 1,
            display: 'flex',
            justifyContent: 'flex-start',
            pl: '16px',
            pr: '16px',
            py: '6px',
            textAlign: 'left',
            width: '100%',
            ...(active && {
              backgroundColor: 'rgba(255, 255, 255, 0.04)'
            }),
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.04)'
            }
          }}
        >
          {icon && (
            <Box
              component="span"
              sx={{
                alignItems: 'center',
                color: 'neutral.400',
                display: 'inline-flex',
                justifyContent: 'center',
                mr: 2,
                ...(active && {
                  color: 'primary.main'
                })
              }}
            >
              {icon}
            </Box>
          )}
          <Box
            component="span"
            sx={{
              color: 'neutral.400',
              flexGrow: 1,
              fontFamily: (theme) => theme.typography.fontFamily,
              fontSize: 14,
              fontWeight: 600,
              lineHeight: '24px',
              whiteSpace: 'nowrap',
              ...(active && {
                color: 'common.white'
              }),
            }}
          >
            {title}
          </Box>
          {open ? <ExpandMoreIcon /> : <ChevronRightIcon />}
        </ButtonBase>
      </li>
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
