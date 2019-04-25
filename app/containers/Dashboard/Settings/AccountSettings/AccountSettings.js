import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line
import jwt_decode from 'jwt-decode';

import { Row, Col } from '@zendeskgarden/react-grid';
import { Button } from '@zendeskgarden/react-buttons';
import { TextField, Label, Input } from '@zendeskgarden/react-textfields';

import { Alert, Title } from '@zendeskgarden/react-notifications';

import '@zendeskgarden/react-notifications/dist/styles.css';

import { faUser } from '@fortawesome/pro-regular-svg-icons';
import TitleBox from '../../../../components/TitleBox';

import { localStorageGet } from '../../../../utils/helpers';

export default class AccountSettings extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };
  state = {
    email: '',
    oldPassword: '',
    newPassword: ''
  };
  componentDidMount() {
    this.decodeToken();
  }
  decodeToken = () => {
    const accessToken = localStorageGet('access_token');
    console.log(accessToken);
    const decodedToken = jwt_decode(accessToken);
    console.log(decodedToken.email);
    this.setState({
      email: decodedToken.email
    });
  };
  handleChange = e => {
    const fieldName = e.target.name;
    this.setState({
      [fieldName]: e.target.value
    });
  };
  handleSubmit = () => {
    this.props.actions.changePasswordAuthenticated(
      this.state.email,
      this.state.oldPassword,
      this.state.newPassword
    );
  };

  render() {
    return (
      <React.Fragment>
        {this.props.auth.error.message && (
          <Alert type="error" style={{ marginBottom: 10 }}>
            <Title>An error has occurred</Title>
            {this.props.auth.error.message}
          </Alert>
        )}
        {this.props.auth.hasUpdatedPassword === 'AUTH_SUCCESS' && (
          <Alert type="success">
            <Title>Password changed successfully</Title>
          </Alert>
        )}
        <TitleBox title="Account Settings" icon={faUser}>
          <Row>
            <Col md={6}>
              <TextField style={{ marginBottom: 8 }}>
                <Label htmlFor="apiKey">Current Password</Label>
                <Input
                  placeholder=""
                  name="oldPassword"
                  type="password"
                  value={this.state.oldPassword}
                  onChange={this.handleChange}
                />
              </TextField>
            </Col>
            <Col md={6}>
              <TextField style={{ marginBottom: 8 }}>
                <Label htmlFor="apiKey">New Password</Label>
                <Input
                  placeholder=""
                  name="newPassword"
                  type="password"
                  value={this.state.passwordConformation}
                  onChange={this.handleChange}
                />
              </TextField>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Button
                style={{ marginTop: 20, marginBottom: 10, width: 200 }}
                onClick={this.handleSubmit}
                primary
              >
                Save
              </Button>
            </Col>
          </Row>
        </TitleBox>
      </React.Fragment>
    );
  }
}
