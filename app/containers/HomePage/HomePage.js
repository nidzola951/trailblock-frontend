import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { Grid, Row, Col } from '@zendeskgarden/react-grid';
import { Button } from '@zendeskgarden/react-buttons';

import MailchimpSubscribe from 'react-mailchimp-subscribe';

import '@zendeskgarden/react-grid/dist/styles.css';

import {
  faCircleNotch,
  faCheckCircle,
  faTimesCircle,
  faChartBar,
  faClipboardListCheck,
  faBook,
  faBan,
  faChartLine,
  faLayerGroup,
  faUsdCircle,
  faBell
} from '@fortawesome/pro-regular-svg-icons';

import '../../assets/global-styles/button.scss';

import {
  Container,
  ShowDesktop,
  ShowMobile,
  MobileIllustration,
  Logo,
  Hero,
  HeroIllustration,
  SignupTitle,
  EmailContainer,
  SingupAlerts,
  AlertIcon,
  Input,
  HeroDecoration,
  HigherComponent,
  Exchanges,
  NotSupported,
  ExchangeLogo,
  Support,
  ToolsGroup1,
  ToolsGroup2,
  Tools1,
  Tools2,
  Tools3,
  Tools4,
  FeaturePreTitle,
  FeatureTitle,
  FeatureDescription,
  Box,
  OtherFeature,
  Icon,
  Soon,
  FeatureTitleSmall,
  FeatureDescSmall,
  BottomCta,
  BottomCtaSkew,
  BottomCtaContainer
} from './Styles';

import LogoImg from '../../assets/images/logo-white.svg';
import HeroIllustrationImg from '../../assets/images/homepage/illustration1.svg';
import BinanceImg from '../../assets/images/homepage/binance-logo.svg';
import BitmexImg from '../../assets/images/homepage/bitmex-logo.svg';
import KrakenImg from '../../assets/images/homepage/kraken-logo.svg';
import PoloniexImg from '../../assets/images/homepage/poloniex-logo.svg';

import ToolsIllustrationImg1 from '../../assets/images/homepage/toolsIllustration1.svg';
import ToolsIllustrationImg2 from '../../assets/images/homepage/toolsIllustration2.svg';
import ToolsIllustrationImg3 from '../../assets/images/homepage/toolsIllustration3.svg';
import ToolsIllustrationImg4 from '../../assets/images/homepage/toolsillustration4.svg';

import ToolsIllustrationMobile from '../../assets/images/homepage/tools-mobile.svg';

const url =
  'https://mastilovic.us19.list-manage.com/subscribe/post?u=6c5713fdc7e6125999e632740&amp;id=aec2fb1715';

/* eslint no-return-assign: 0 react/require-default-props: 0 */
const CustomForm = ({ status, message, onValidated, big }) => {
  let email;
  function handleChange(e) {
    email = e.target.value;
  }
  const submit = () =>
    email &&
    email.indexOf('@') > -1 &&
    onValidated({
      EMAIL: email
    });

  return (
    <Row>
      <Col md={8}>
        <Input
          onChange={handleChange}
          type="email"
          placeholder="Your email"
          style={{ height: big && '65px' }}
        />
      </Col>
      <Col md={4}>
        <Button primary onClick={submit} style={{ height: big && '65px' }}>
          NOTIFY ME
        </Button>
      </Col>
      <SingupAlerts>
        {status === 'sending' && (
          <div style={{ color: 'white' }}>
            <AlertIcon icon={faCircleNotch} spin />
            <p>Sending...</p>
          </div>
        )}
        {status === 'error' && (
          <div style={{ color: '#E60402' }}>
            <AlertIcon icon={faTimesCircle} style={{ color: '#E60402' }} />
            {/* eslint-disable-next-line */}
            <p dangerouslySetInnerHTML={{ __html: message }} />
          </div>
        )}
        {status === 'success' && (
          <div style={{ color: 'white' }}>
            <AlertIcon icon={faCheckCircle} style={{ color: '#3CBC98' }} />
            {/* eslint-disable-next-line */}
            <p dangerouslySetInnerHTML={{ __html: message }} />
          </div>
        )}
      </SingupAlerts>
    </Row>
  );
};
/* eslint no-return-assign: 2 */

CustomForm.propTypes = {
  status: PropTypes.func,
  message: PropTypes.func,
  onValidated: PropTypes.func,
  big: PropTypes.bool
};

const HomePage = () => (
  <React.Fragment>
    <Helmet>
      <title>Trailblock</title>
      <meta name="description" content="Tools for trading cryptocurrencies" />
    </Helmet>

    <Hero>
      <Container>
        <Grid>
          <Row>
            <Col sm={12}>
              <Logo src={LogoImg} alt="logo" style={{ width: 100 }} />
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <h1>Tools for trading cryptocurrencies </h1>
              <h1>Lower your risks, maximize your profits</h1>
              <p>
                Automate entry and exit&apos;s on your trade positions in order to maximize your
                profits, while at the same time lowering your risks
              </p>
              <ShowMobile>
                <MobileIllustration src={HeroIllustrationImg} alt="illustration1" />
              </ShowMobile>
              <SignupTitle>Get notified when beta is ready:</SignupTitle>
              <EmailContainer>
                <MailchimpSubscribe
                  url={url}
                  render={({ subscribe, status, message }) => (
                    <CustomForm
                      status={status}
                      message={message}
                      onValidated={formData => subscribe(formData)}
                    />
                  )}
                />
              </EmailContainer>
            </Col>
            <ShowDesktop>
              <Col lg={6}>
                <HeroIllustration src={HeroIllustrationImg} alt="illustration1" />
              </Col>
            </ShowDesktop>
          </Row>
        </Grid>
      </Container>
      <HeroDecoration />
    </Hero>
    <Container>
      <HigherComponent>
        <Grid>
          <Exchanges>
            <Row>
              <Col md={3}>
                <ExchangeLogo src={BinanceImg} alt="Binance logo" />
                <Support>Supported</Support>
              </Col>
              <Col md={1} />
              <Col md={8}>
                <NotSupported>
                  <Grid>
                    <Row>
                      <Col md={4}>
                        <ExchangeLogo src={BitmexImg} alt="Bitmex logo" />
                      </Col>
                      <Col md={4}>
                        <ExchangeLogo src={KrakenImg} alt="Kraken logo" />
                      </Col>
                      <Col md={4}>
                        <ExchangeLogo src={PoloniexImg} alt="Poloniex logo" />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <Support>Comming soon</Support>
                      </Col>
                    </Row>
                  </Grid>
                </NotSupported>
              </Col>
            </Row>
          </Exchanges>
          <Row>
            <Col md={12}>
              <ToolsGroup1>
                <Row>
                  <Col lg={6}>
                    <ShowDesktop>
                      <Tools1>
                        <img src={ToolsIllustrationImg1} alt="Tools 1" />
                      </Tools1>
                      <Tools2>
                        <img src={ToolsIllustrationImg2} alt="Tools 2" />
                      </Tools2>
                      <Tools3>
                        <img src={ToolsIllustrationImg3} alt="Tools 3" />
                      </Tools3>
                    </ShowDesktop>
                    <ShowMobile>
                      <img
                        src={ToolsIllustrationMobile}
                        alt="tools mobile"
                        style={{ maxWidth: 600, display: 'block', margin: '0 auto' }}
                      />
                    </ShowMobile>
                  </Col>
                  <Col lg={6}>
                    <FeaturePreTitle style={{ marginTop: 60 }}>
                      Maximize profits with
                    </FeaturePreTitle>
                    <FeatureTitle>Plethora of trading tools</FeatureTitle>
                    <FeatureDescription>
                      No more kicking yourself for exiting the trade too early instead of staying in
                      longer, and maximizing your profits.
                    </FeatureDescription>
                    <FeatureDescription>
                      With trailing tools, you can set your targets so that you don&apos;t on
                      profits, while still keeping peace of mind that you won&apos;t liquidate your
                      account thanks to various stop loss options.
                    </FeatureDescription>
                  </Col>
                </Row>
              </ToolsGroup1>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <ToolsGroup2>
                <Row>
                  <Col lg={6}>
                    <ShowMobile>
                      <img
                        src={ToolsIllustrationImg4}
                        alt="Tools 4"
                        style={{
                          maxWidth: 600,
                          display: 'block',
                          margin: '0 auto',
                          marginBottom: 50
                        }}
                      />
                    </ShowMobile>
                    <FeaturePreTitle>Keep track of your trades</FeaturePreTitle>
                    <FeatureTitle>Trading diary</FeatureTitle>
                    <FeatureDescription>
                      Just the information that exchanges gives you, often isn&apos;t enough. You
                      still want to know how much you earned in each trade.
                    </FeatureDescription>
                    <FeatureDescription>
                      No more Excel spreadsheets, we&apos;ll keep track of it, so you can focus on
                      trading, whilst we will automatically calculate your profits/losses on a
                      daily/weekly and monthly basis.
                    </FeatureDescription>
                  </Col>
                  <Col lg={6}>
                    <ShowDesktop>
                      <Tools4>
                        <img src={ToolsIllustrationImg4} alt="Tools 4" />
                      </Tools4>
                    </ShowDesktop>
                  </Col>
                </Row>
              </ToolsGroup2>
            </Col>
          </Row>
          <Row>
            <Col md={12} style={{ textAlign: 'center' }}>
              <FeaturePreTitle>Let&apos;s summarize</FeaturePreTitle>
              <FeatureTitle style={{ marginBottom: 30 }}>All of the features we have</FeatureTitle>
            </Col>
            <Col md={12}>
              <Box>
                <Row>
                  <Col lg={4} md={6}>
                    <OtherFeature>
                      <Icon icon={faChartBar} />
                      <FeatureTitleSmall>Standard exchange tools</FeatureTitleSmall>
                      <FeatureDescSmall>
                        Just like on exchanges, with TB you have access to all of the standard tools
                        you would expect
                      </FeatureDescSmall>
                    </OtherFeature>
                  </Col>
                  <Col lg={4} md={6}>
                    <OtherFeature>
                      <Icon icon={faChartLine} />
                      <FeatureTitleSmall>Trailing tools</FeatureTitleSmall>
                      <FeatureDescSmall>
                        With trailing tools, you can leave to us to follow the price and close your
                        position at the best price possible
                      </FeatureDescSmall>
                    </OtherFeature>
                  </Col>
                  <Col lg={4} md={6}>
                    <OtherFeature>
                      <Icon icon={faLayerGroup} />
                      <FeatureTitleSmall>Layered orders</FeatureTitleSmall>
                      <FeatureDescSmall>
                        Have multiple target&apos;s in mind for your position? Sell different
                        amounts at targets you set!
                      </FeatureDescSmall>
                    </OtherFeature>
                  </Col>
                  <Col lg={4} md={6}>
                    <OtherFeature>
                      <Icon icon={faUsdCircle} />
                      <FeatureTitleSmall>Dollar cost averaging</FeatureTitleSmall>
                      <FeatureDescSmall>
                        Some times trades go in the wrong directions. Easily set levels at which you
                        can DCA your average position price
                      </FeatureDescSmall>
                    </OtherFeature>
                  </Col>
                  <Col lg={4} md={6}>
                    <OtherFeature>
                      <Icon icon={faBan} />
                      <FeatureTitleSmall>Stop loss</FeatureTitleSmall>
                      <FeatureDescSmall>
                        You can also set custom stop loss (or trailing stop loss) - in case your
                        position really goes south
                      </FeatureDescSmall>
                    </OtherFeature>
                  </Col>
                  <Col lg={4} md={6}>
                    <OtherFeature>
                      <Icon icon={faBook} />
                      <FeatureTitleSmall>Trading diary</FeatureTitleSmall>
                      <FeatureDescSmall>
                        Keep track of all of your trades - how much you risked, how much you earned,
                        what was your profit in selected period - all in one place
                      </FeatureDescSmall>
                    </OtherFeature>
                  </Col>
                  <Col lg={4} md={6}>
                    <OtherFeature>
                      <Icon icon={faBell} />
                      <FeatureTitleSmall>
                        Custom alerts <Soon>soon</Soon>
                      </FeatureTitleSmall>
                      <FeatureDescSmall>
                        Receive custom alerts on your phone/email once certain actions or events
                        happen
                      </FeatureDescSmall>
                    </OtherFeature>
                  </Col>
                  <Col lg={4} md={6}>
                    <OtherFeature>
                      <Icon icon={faClipboardListCheck} />
                      <FeatureTitleSmall>
                        Conditional orders <Soon>soon</Soon>
                      </FeatureTitleSmall>
                      <FeatureDescSmall>
                        Add conditions to your trades - Don&apos;t wait for BTC to break certain
                        support - set a condition!
                      </FeatureDescSmall>
                    </OtherFeature>
                  </Col>
                </Row>
              </Box>
            </Col>
          </Row>
        </Grid>
      </HigherComponent>
    </Container>
    <BottomCta>
      <BottomCtaSkew />
      <Container>
        <Grid>
          <Row>
            <Col md={2} />
            <Col md={8}>
              <BottomCtaContainer>
                <h1>Get notified when we launch</h1>
                <p>We plan on slowly rolling out the beta invites in the upcoming weeks.</p>
                <p>Beta access will be free.</p>
              </BottomCtaContainer>
              <EmailContainer style={{ marginTop: 30 }}>
                <MailchimpSubscribe
                  url={url}
                  render={({ subscribe, status, message }) => (
                    <CustomForm
                      status={status}
                      message={message}
                      onValidated={formData => subscribe(formData)}
                      big
                    />
                  )}
                />
              </EmailContainer>
            </Col>
          </Row>
        </Grid>
      </Container>
    </BottomCta>
  </React.Fragment>
);

export default HomePage;
