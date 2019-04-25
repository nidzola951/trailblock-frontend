import React from 'react';
import PropTypes from 'prop-types';

import ButterToast from 'butter-toast';
import { Item } from '@zendeskgarden/react-menus';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTimes, faExclamationCircle, faPlay } from '@fortawesome/pro-regular-svg-icons';

import OverflowMenu from '../../../../../../components/OverflowMenu';

import config from '../../../../../../config/config';
import request from '../../../../../../utils/request';
import Toast from '../../../../../../components/Toast/Toast';

function CancelTrade(id) {
  const requestURL = `${config.api}/trade/${id}/cancel`;
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  };
  request(requestURL, options)
    .then(() => {
      ButterToast.raise({
        /* eslint react/prop-types: 0 */
        content: ({ dismiss }) => (
          <Toast dismiss={dismiss} success>
            Cancel queued
          </Toast>
        ),
        toastTimeout: 4000 // default: 3000 ms
      });
    })
    .catch(() => {
      console.log('neki error');
    });
}

function panicSell(id) {
  const requestURL = `${config.api}/trade/${id}/panic-sell`;
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  };
  request(requestURL, options)
    .then(() => {
      ButterToast.raise({
        /* eslint react/prop-types: 0 */
        content: ({ dismiss }) => (
          <Toast dismiss={dismiss} success>
            Panic sell queued
          </Toast>
        ),
        toastTimeout: 4000 // default: 3000 ms
      });
    })
    .catch(() => {
      console.log('neki error');
    });
}

const Menu = props => (
  <OverflowMenu>
    <Item key="resume-trade">
      <span style={{ width: 15, marginRight: 7, display: 'inline-block', textAlign: 'center' }}>
        <FontAwesomeIcon icon={faPlay} />
      </span>
      Resume trade
    </Item>
    <Item key="panic-sell" onClick={() => panicSell(props.id)}>
      <span style={{ width: 15, marginRight: 7, display: 'inline-block', textAlign: 'center' }}>
        <FontAwesomeIcon icon={faExclamationCircle} />
      </span>
      Panic Sell
    </Item>
    <Item key="cancel-trade" onClick={() => CancelTrade(props.id)}>
      <span style={{ width: 15, marginRight: 7, display: 'inline-block', textAlign: 'center' }}>
        <FontAwesomeIcon icon={faTimes} />
      </span>
      Cancel trade
    </Item>
  </OverflowMenu>
);

Menu.propTypes = {
  id: PropTypes.string.isRequired
};

export default Menu;
