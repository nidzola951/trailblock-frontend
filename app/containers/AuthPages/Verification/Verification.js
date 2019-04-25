import React from 'react';
import PropTypes from 'prop-types';

import { Col, Grid, Row } from '@zendeskgarden/react-grid';
import { TextField, Label, Input } from '@zendeskgarden/react-textfields';
import { Button } from '@zendeskgarden/react-buttons';
import { Alert, Title } from '@zendeskgarden/react-notifications';

import '@zendeskgarden/react-notifications/dist/styles.css';
import '../../../assets/global-styles/input.scss';
import '../../../assets/global-styles/button.scss';

import { CenterContainer, BoxTitle, ActionButtonSuccess } from '../AuthStyles/AuthStyles';

export default class Verification extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };
  state = {
    email: '',
    conformationCode: ''
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
    this.props.actions.verifyAccount(this.state.email.toLowerCase(), this.state.conformationCode);
  };
  render() {
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <CenterContainer>
              <Row>
                <Col md={12}>
                  {this.props.auth.isConfirmed === 'AUTH_SUCCESS' ? (
                    <Alert type="success">
                      <Title>Verification successful</Title>
                      To log into your account,{' '}
                      <ActionButtonSuccess to="login">please click here.</ActionButtonSuccess>
                    </Alert>
                  ) : (
                    <React.Fragment>
                      <BoxTitle>Verify your account</BoxTitle>
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
                            value={this.state.email}
                            onChange={this.handleDataInput}
                          />
                        </TextField>
                        <TextField style={{ marginBottom: 20 }}>
                          <Label>Verification code:</Label>
                          <Input
                            placeholder="Verification code"
                            name="conformationCode"
                            value={this.state.conformationCode}
                            onChange={this.handleDataInput}
                          />
                        </TextField>

                        <Button type="submit" primary>
                          Verify
                        </Button>
                      </form>
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
