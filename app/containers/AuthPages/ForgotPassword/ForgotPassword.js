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

import { CenterContainer, BoxTitle } from '../AuthStyles/AuthStyles';

export default class ForgotPassword extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };
  state = {
    email: '',
    emailError: ''
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

    if (emailError === '') {
      this.props.actions.forgotPassword(this.state.email.toLowerCase());
    }
  };
  render() {
    if (this.props.auth.hasSentCode === 'AUTH_SUCCESS') {
      return <Redirect to="/password-change" />;
    }
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <CenterContainer>
              <Row>
                <Col md={12}>
                  <BoxTitle>Reset Password</BoxTitle>
                  {this.props.auth.error.message && (
                    <Alert type="error" style={{ marginBottom: 10 }}>
                      <Title>An error has occurred</Title>
                      {this.props.auth.error.message}
                    </Alert>
                  )}
                  <form onSubmit={this.handleDataSubmit}>
                    <TextField style={{ marginBottom: 20 }}>
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

                    <Button type="submit" primary>
                      Send reset code
                    </Button>
                  </form>
                </Col>
              </Row>
            </CenterContainer>
          </Col>
        </Row>
      </Grid>
    );
  }
}
