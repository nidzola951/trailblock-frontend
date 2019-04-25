import React from 'react';
import PropTypes from 'prop-types';
import ButterToast from 'butter-toast';

import { Row, Col } from '@zendeskgarden/react-grid';
import { Button } from '@zendeskgarden/react-buttons';

import { TextField, Label, Input } from '@zendeskgarden/react-textfields';
import { faKey } from '@fortawesome/pro-regular-svg-icons';
import TitleBox from '../../../../components/TitleBox';
import { Title, Ol } from '../Styles';
import Toast from '../../../../components/Toast/Toast';

import config from '../../../../config/config';
import request from '../../../../utils/request';

export default class Api extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };
  state = {
    apiKey: '',
    apiSecret: ''
  };
  componentDidMount() {
    const requestURL = `${config.api}/user`;
    const options = {
      method: 'get'
    };

    try {
      request(requestURL, options).then(response => {
        console.log(response);
        if (response) {
          console.log('response it is');
          if (response.apiKey !== '(empty)') {
            this.setState({
              apiKey: response.apiKey
            });
            if (response.apiKey !== '' && response.apiKey) {
              this.setState({
                apiSecret: 'asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd'
              });
            }
          }
        }
      });
    } catch (err) {
      this.props.actions.setSomethingWentWrong();
    }
  }
  handleChange = e => {
    const fieldName = e.target.name;
    this.setState({
      [fieldName]: e.target.value
    });
  };
  handleSubmit = () => {
    const formData = {
      apiKey: this.state.apiKey,
      apiSecret: this.state.apiSecret
    };

    const requestURL = `${config.api}/user/binance-keys`;
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    };

    try {
      request(requestURL, options).then(response => {
        if (response.keysValid) {
          ButterToast.raise({
            content: ({ dismiss }) => (
              <Toast dismiss={dismiss} success>
                Saved successfully
              </Toast>
            ),
            toastTimeout: 40000 // default: 3000 ms
          });
        } else {
          ButterToast.raise({
            content: ({ dismiss }) => (
              <Toast dismiss={dismiss} error>
                {response.msg}
              </Toast>
            ),
            toastTimeout: 40000 // default: 3000 ms
          });
        }
        this.props.actions.loadUserInfo();
      });
    } catch (err) {
      this.props.actions.setSomethingWentWrong();
    }
  };

  render() {
    return (
      <TitleBox title="Api Keys Settings" icon={faKey}>
        <Row>
          <Col md={6}>
            <Title>Binance</Title>
            <p style={{ fontWeight: 600, opacity: 0.8 }}>Instructions</p>
            <Ol>
              <li>
                <span>Log in to your Binance account</span>
              </li>
              <li>
                <span>
                  Navigate to your <span style={{ fontWeight: 600 }}>account</span> page. This
                  should appear when you first login to Binance. If you don&apos;t see this page go
                  into the upper right and select the user icon and then &quot;Account&quot; and you
                  will be taken there
                </span>
              </li>
              <li>
                <span>
                  In Api box, click on <span style={{ fontWeight: 600 }}> API settings</span> button
                </span>
              </li>
              <li>
                <span>
                  Name your key and press submit (<span style={{ fontWeight: 600 }}>Note: </span>{' '}
                  You will need to enable 2FA before this)
                </span>
              </li>
              <li>
                <span>
                  Copy your API key and secret into input fields on this page. Make sure not to
                  store the secret in an unsafe location once added to Trailblock. Binance only
                  shows the secret on creating the key so be sure to hold on to it.
                </span>
              </li>
              <li>
                <span>
                  Make sure <span style={{ fontWeight: 600 }}>&quot;Trading&quot;</span> (but not
                  &quot;Enable Withdrawals&quot;) is enabled.
                </span>
              </li>
              <li>
                <span>Press save</span>
              </li>
            </Ol>
          </Col>
          <Col md={6}>
            <TitleBox title="Api details" insideBox icon={faKey}>
              <TextField style={{ marginBottom: 8 }}>
                <Label htmlFor="apiKey">Api Key</Label>
                <Input
                  placeholder=""
                  name="apiKey"
                  type="text"
                  value={this.state.apiKey}
                  onChange={this.handleChange}
                />
              </TextField>
              <TextField style={{ marginBottom: 8 }}>
                <Label htmlFor="apiSecret">Api Secret</Label>
                <Input
                  placeholder=""
                  name="apiSecret"
                  type="password"
                  value={this.state.apiSecret}
                  onChange={this.handleChange}
                />
              </TextField>
              <Button
                style={{ marginTop: 20, marginBottom: 10, width: 200 }}
                onClick={this.handleSubmit}
                primary
              >
                Save
              </Button>
            </TitleBox>
          </Col>
        </Row>
      </TitleBox>
    );
  }
}
