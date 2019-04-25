import React from 'react';
import PropTypes from 'prop-types';

import { Col, Grid, Row } from '@zendeskgarden/react-grid';
import { TextField, Label, Input, Message } from '@zendeskgarden/react-textfields';
import { Button } from '@zendeskgarden/react-buttons';
import { Alert, Title } from '@zendeskgarden/react-notifications';

import '@zendeskgarden/react-notifications/dist/styles.css';
import '../../../assets/global-styles/input.scss';
import '../../../assets/global-styles/button.scss';

import {
  CenterContainer,
  BoxTitle,
  ActionButton,
  ActionButtonSuccess,
  Separator
} from '../AuthStyles/AuthStyles';

export default class PasswordChange extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };
  state = {
    email: '',
    password: '',
    code: '',
    emailError: '',
    showValidationMessages: false,
    passwordLongEnough: false,
    passwordContainsNumber: false,
    passwordContainsUppercase: false
  };
  componentDidMount() {
    this.props.actions.init();
  }
  handleDataInput = event => {
    const targetName = event.target.name;
    const targetValue = event.target.value;
    let { passwordLongEnough, passwordContainsNumber, passwordContainsUppercase } = {
      ...this.state
    };
    if (targetName === 'password') {
      passwordLongEnough = targetValue.length >= 8;
      passwordContainsNumber = /\d/.test(targetValue);
      passwordContainsUppercase = /[A-Z]/.test(targetValue);
    }
    this.setState({
      [targetName]: targetValue,
      passwordLongEnough,
      passwordContainsNumber,
      passwordContainsUppercase
    });
  };
  handleDataSubmit = e => {
    e.preventDefault();
    const { passwordLongEnough, passwordContainsNumber, passwordContainsUppercase } = {
      ...this.state
    };
    let emailError = '';
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = re.test(String(this.state.email).toLowerCase());

    if (this.state.email === '') {
      emailError = "E-mail can't be empty";
    }

    if (!emailValid) {
      emailError = 'Please enter a valid e-mail address';
    }

    this.setState({
      emailError
    });

    if (
      emailError === '' &&
      passwordLongEnough &&
      passwordContainsNumber &&
      passwordContainsUppercase
    ) {
      this.props.actions.changePassword(
        this.state.email.toLocaleLowerCase(),
        this.state.code,
        this.state.password
      );
    }
  };
  render() {
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <CenterContainer>
              <Row>
                <Col md={12}>
                  <BoxTitle>Change password</BoxTitle>
                  {this.props.auth.hasChangedPassword === 'AUTH_SUCCESS' && (
                    <Alert type="success">
                      <Title>Password changed</Title>
                      Your password has been changed.{' '}
                      <ActionButtonSuccess to="login">Click here to log in.</ActionButtonSuccess>
                    </Alert>
                  )}
                  {this.props.auth.error.message && (
                    <Alert type="error" style={{ marginBottom: 10 }}>
                      <Title>An error has occurred</Title>
                      {this.props.auth.error.message}
                    </Alert>
                  )}
                  {this.props.auth.hasChangedPassword !== 'AUTH_SUCCESS' && (
                    <React.Fragment>
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
                        <TextField style={{ marginBottom: 7 }}>
                          <Label>Password reset code:</Label>
                          <Input
                            placeholder="Reset code"
                            name="code"
                            validation={this.state.emailError === '' ? 'none' : 'error'}
                            value={this.state.code}
                            onChange={this.handleDataInput}
                          />
                        </TextField>
                        <TextField
                          style={{ marginBottom: !this.state.showValidationMessages ? 20 : 7 }}
                        >
                          <Label>New password:</Label>
                          <Input
                            placeholder="Password"
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleDataInput}
                            onClick={() => this.setState({ showValidationMessages: true })}
                          />
                        </TextField>
                        {this.state.showValidationMessages && (
                          <div style={{ marginBottom: 10 }}>
                            <Message
                              validation={this.state.passwordLongEnough ? 'success' : 'error'}
                              style={{ marginBottom: 5 }}
                            >
                              Password has to have at least 8 characters
                            </Message>
                            <Message
                              validation={this.state.passwordContainsNumber ? 'success' : 'error'}
                              style={{ marginBottom: 5 }}
                            >
                              Password has to have at least 1 number
                            </Message>
                            <Message
                              validation={
                                this.state.passwordContainsUppercase ? 'success' : 'error'
                              }
                              style={{ marginBottom: 5 }}
                            >
                              Password has to have at least 1 uppercase letter
                            </Message>
                          </div>
                        )}
                        <Button type="submit" primary>
                          Reset password
                        </Button>
                      </form>
                      <Separator />
                      <p style={{ textAlign: 'center', fontSize: 12 }}>
                        Still having trouble?{' '}
                        <ActionButton style={{ marginLeft: 4 }} to="/login">
                          Contact support
                        </ActionButton>
                      </p>
                    </React.Fragment>
                  )}
                </Col>
              </Row>
            </CenterContainer>
          </Col>
        </Row>
      </Grid>
    );
  }
}
