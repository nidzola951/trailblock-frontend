import React from 'react';
import PropTypes from 'prop-types';

import { Col, Grid, Row } from '@zendeskgarden/react-grid';
import { TextField, Label, Input, Message } from '@zendeskgarden/react-textfields';
import { Button } from '@zendeskgarden/react-buttons';
import { Alert, Title } from '@zendeskgarden/react-notifications';

import '@zendeskgarden/react-notifications/dist/styles.css';
import '../../../assets/global-styles/input.scss';
import '../../../assets/global-styles/button.scss';

import { CenterContainer, BoxTitle, ActionButtonSuccess } from '../AuthStyles/AuthStyles';

export default class SetNewPassword extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };
  state = {
    email: '',
    password: '',
    emailError: '',
    showValidationMessages: false,
    passwordLongEnough: false,
    passwordContainsNumber: false,
    passwordContainsUppercase: false
  };
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
      this.props.actions.completeNewPassword(
        this.state.email.toLocaleLowerCase(),
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
                  <BoxTitle>Set new password</BoxTitle>
                  {this.props.auth.hasChangedPassword === 'AUTH_SUCCESS' ? (
                    <Alert type="success">
                      <Title>Password set successfully</Title>
                      <ActionButtonSuccess to="/login">
                        Go back to login page to log in.
                      </ActionButtonSuccess>
                    </Alert>
                  ) : (
                    <React.Fragment>
                      {this.props.auth.error.message &&
                        this.props.auth.error.code !== 'PasswordResetRequiredException' && (
                          <Alert type="error" style={{ marginBottom: 10 }}>
                            <Title>An error has occurred</Title>
                            {this.props.auth.error.message}
                          </Alert>
                        )}
                      {this.props.auth.hasSignedUp !== 'AUTH_SUCCESS' && (
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
                            <TextField
                              style={{ marginBottom: !this.state.showValidationMessages ? 20 : 7 }}
                            >
                              <Label>Password:</Label>
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
                                  validation={
                                    this.state.passwordContainsNumber ? 'success' : 'error'
                                  }
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
                              Set password
                            </Button>
                          </form>
                        </React.Fragment>
                      )}
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
