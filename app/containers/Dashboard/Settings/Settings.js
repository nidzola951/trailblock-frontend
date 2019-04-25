import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Row, Col } from '@zendeskgarden/react-grid';

import AccountSettings from './AccountSettings';
import Api from './Api/';

export default class Settings extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  };
  state = {
    type: ''
  };
  componentWillMount() {
    const tab = { ...this.props.match.params };
    if (tab.tab === 'api') {
      this.setState({
        type: tab.tab
      });
    }
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={12}>
            {this.state.type === 'api' ? (
              <Api />
            ) : (
              <React.Fragment>
                <AccountSettings />
                <Api />
              </React.Fragment>
            )}
          </Col>
        </Row>
      </Grid>
    );
  }
}
