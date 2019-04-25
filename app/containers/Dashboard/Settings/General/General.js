import React from 'react';
// eslint-disable-next-line
import jwt_decode from 'jwt-decode';

import { Row, Col } from '@zendeskgarden/react-grid';
import { Button } from '@zendeskgarden/react-buttons';
import { TextField, Label, Input } from '@zendeskgarden/react-textfields';

import { faUser, faCog, faPalette } from '@fortawesome/pro-regular-svg-icons';
import TitleBox from '../../../../components/TitleBox';

import { localStorageGet } from '../../../../utils/helpers';

export default class General extends React.Component {
  state = {
    email: ''
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

  render() {
    return (
      <TitleBox
        title="General Settings"
        icon={faCog}
        paddingRight={0}
        paddingLeft={0}
        paddingBottom={0}
        paddingTop={0}
      >
        <TitleBox
          title="Account Settings"
          icon={faUser}
          insideBox
          noBorder
          paddingTop={10}
          paddingBottom={10}
        >
          {this.state.email}
          <Row>
            <Col md={6}>
              <TextField style={{ marginBottom: 8 }}>
                <Label htmlFor="apiKey">New Password</Label>
                <Input
                  placeholder=""
                  name="apiKey"
                  type="text"
                  value=""
                  onChange={this.handleChange}
                />
              </TextField>
            </Col>
            <Col md={6}>
              <TextField style={{ marginBottom: 8 }}>
                <Label htmlFor="apiKey">Confirm Password</Label>
                <Input
                  placeholder=""
                  name="apiKey"
                  type="text"
                  value=""
                  onChange={this.handleChange}
                />
              </TextField>
            </Col>
          </Row>
        </TitleBox>
        <TitleBox
          title="UI Style"
          icon={faPalette}
          insideBox
          noBorder
          paddingTop={10}
          paddingBottom={10}
        >
          <p>Soon.</p>
        </TitleBox>
        <div style={{ padding: 20 }}>
          <Button
            style={{ marginTop: 20, marginBottom: 10, width: 200 }}
            onClick={this.handleSubmit}
            primary
          >
            Save
          </Button>
        </div>
      </TitleBox>
    );
  }
}
