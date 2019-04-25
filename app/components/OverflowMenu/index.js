import React from 'react';

import { OverflowButton } from '@zendeskgarden/react-tables';
import { Menu } from '@zendeskgarden/react-menus';
import PropTypes from 'prop-types';

const OverflowMenu = props => (
  <Menu
    placement="bottom-end"
    small
    popperModifiers={{
      preventOverflow: {
        boundariesElement: 'viewport'
      },
      flip: {
        enabled: false
      },
      offset: {
        /* eslint-disable no-param-reassign */
        fn: data => {
          data.offsets.popper.top -= 12;
          return data;
        }
        /* eslint-enable */
      }
    }}
    trigger={({ ref, isOpen }) => {
      const buttonProps = { innerRef: ref, active: isOpen, 'aria-label': 'Row Actions' };

      if (isOpen) {
        buttonProps.focused = false;
      }

      return (
        <OverflowButton
          {...buttonProps}
          onBlur={e => {
            /** Used to keep visual focus within row once menu is exanded */
            if (isOpen) {
              e.preventDefault();
            }
          }}
        />
      );
    }}
  >
    {props.children}
  </Menu>
);

OverflowMenu.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default OverflowMenu;
