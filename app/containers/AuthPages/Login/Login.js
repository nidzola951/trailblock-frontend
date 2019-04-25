import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { Col, Grid, Row } from '@zendeskgarden/react-grid';
import { TextField, Label, Input, Message } from '@zendeskgarden/react-textfields';
import { Button } from '@zendeskgarden/react-buttons';
import { Alert, Title } from '@zendeskgarden/react-notifications';

import '@zendeskgarden/react-notifications/dist/styles.css';
import '../../../assets/global-styles/input.scss';
import '../../../assets/global-styles/button.scss';

import { CenterContainer, BoxTitle, ActionButton, Separator } from '../AuthStyles/AuthStyles';

import config from '../../../config/config';
import request from '../../../utils/request';

export default class Login extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };
  state = {
    email: '',
    password: '',
    emailError: '',
    passwordError: ''
  };
  componentDidMount() {
    this.props.actions.init();
  }
  handleDataInput = event => {
    const targetName = event.target.name;
    const targetValue = event.target.value;
    this.setState({
      [targetName]: targetValue
    });
  };
  handleDataSubmit = e => {
    e.preventDefault();
    let emailError = '';
    let passwordError = '';
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = re.test(String(this.state.email).toLowerCase());

    if (this.state.email === '') {
      emailError = "E-mail can't be empty";
    }

    if (!emailValid) {
      emailError = 'Please enter a valid e-mail address';
    }

    if (this.state.password === '') {
      passwordError = "Password can't be empty";
    }

    this.setState({
      emailError,
      passwordError
    });

    if (emailError === '' && passwordError === '') {
      this.props.actions.signIn(this.state.email.toLowerCase(), this.state.password);
    }
  };
  dummyRequest = () => {
    const requestURL = `${config.api}/user`;
    const options = {
      method: 'get'
    };

    try {
      request(requestURL, options).then(response => {
        console.log(response);
      });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    if (this.props.auth.passwordResetRequired === 'AUTH_SUCCESS') {
      return <Redirect to="/set-new-password" />;
    }
    if (this.props.auth.isSignedIn === 'AUTH_SUCCESS') {
      this.dummyRequest();
      return <Redirect to="/dashboard" />;
    }
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <CenterContainer>
              <Row>
                <Col md={12}>
                  <BoxTitle>Log in</BoxTitle>
                  {this.props.auth.error.message && (
                    <Alert type="error" style={{ marginBottom: 10 }}>
                      <Title>An error has occurred</Title>
                      {this.props.auth.error.message}
                    </Alert>
                  )}
                  <form onSubmit={this.handleDataSubmit}>
                    <TextField style={{ marginBottom: 5 }}>
                      <Label>E-mail:</Label>
                      <Input
                        placeholder="E-mail"
                        name="email"
                        validation={this.state.emailError === '' ? 'none' : 'error'}
                        value={this.state.email}
                        onChange={this.handleDataInput}
                      />
                    </TextField>
                    {this.state.emailError !== '' && (
                      <Message validation="error">{this.state.emailError}</Message>
                    )}
                    <TextField style={{ marginBottom: this.state.passwordError === '' ? 20 : 5 }}>
                      <Label>Password:</Label>
                      <Input
                        placeholder="Password"
                        name="password"
                        type="password"
                        validation={this.state.passwordError === '' ? 'none' : 'error'}
                        value={this.state.password}
                        onChange={this.handleDataInput}
                      />
                    </TextField>
                    {this.state.passwordError !== '' && (
                      <Message validation="error" style={{ marginBottom: 20 }}>
                        {this.state.passwordError}
                      </Message>
                    )}

                    <Button type="submit" primary>
                      Log in
                    </Button>
                    <ActionButton
                      style={{ fontSize: 12, display: 'block', margin: '0 auto', marginTop: 15 }}
                      to="/password-reset"
                    >
                      Forgot password?
                    </ActionButton>
                  </form>
                  <Separator />
                  <p style={{ textAlign: 'center', fontSize: 12 }}>
                    Need an account?{' '}
                    <ActionButton style={{ marginLeft: 4 }} to="/register">
                      Register here
                    </ActionButton>
                  </p>
                </Col>
              </Row>
            </CenterContainer>
          </Col>
        </Row>
      </Grid>
    );
  }
}
