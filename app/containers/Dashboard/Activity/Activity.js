import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';

import { Col, Grid, Row } from '@zendeskgarden/react-grid';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import {
  faHistory,
  faExclamationCircle,
  faShieldAlt,
  faUsdCircle,
  faCalendarAlt,
  faCheck,
  faFlag
} from '@fortawesome/pro-regular-svg-icons';
import { Pagination } from '@zendeskgarden/react-pagination';
import { Dots } from '@zendeskgarden/react-loaders';

import formatMessage from './formatMessage';

import TitleBox from '../../../components/TitleBox';
import { getPagedData, localStorageSet } from '../../../utils/helpers';
import EmptyPlaceholder from '../../../components/EmptyPlaceholder';

export const Container = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e5e9eb;
  h3 {
    font-weight: 600;
    font-size: 14px;
  }
  p {
    margin-top: 5px;
    font-size: 14px;
  }
`;

export const IconContainer = styled(FontAwesomeIcon)`
  font-size: 20px;
  height: 100%;
  color: #7e99a8;
`;

export const NewBadge = styled.span`
  background-color: #3cbc98;
  color: white;
  text-transform: uppercase;
  font-size: 9px;
  letter-spacing: 0.7px;
  padding: 2px;
  padding-left: 7px;
  padding-right: 7px;
  border-radius: 3px;
  font-weight: 700;
`;

export default class Activity extends React.Component {
  state = {
    currentPage: 1,
    pageSize: 10
  };
  componentDidMount() {
    this.props.actions.setUnreadNotifications(0);
  }
  setLastSeenId() {
    if (this.props.userActivity.length) {
      localStorageSet('lastSeenId', this.props.userActivity[0].id);
    } else {
      localStorageSet('lastSeenId', null);
    }
  }

  render() {
    if (!this.props.userActivityLoading) {
      this.setLastSeenId();
    }
    const totalPages = !this.props.userActivityLoading
      ? Math.ceil(this.props.userActivity.length / this.state.pageSize)
      : 0;
    return (
      <Grid>
        <Row>
          <TitleBox
            title="Activity log"
            icon={faHistory}
            paddingTop={0}
            paddingLeft={0}
            paddingBottom={0}
            paddingRight={0}
          >
            {this.props.userActivityLoading ? (
              <div
                style={{
                  padding: 20,
                  paddingBottom: 15,
                  textAlign: 'center',
                  fontSize: 30,
                  color: '#3CBB98'
                }}
              >
                <Dots />
              </div>
            ) : (
              <React.Fragment>
                {this.props.userActivity.length ? (
                  <React.Fragment>
                    {getPagedData(
                      this.props.userActivity,
                      this.state.currentPage,
                      this.state.pageSize
                    ).map((activity, key) => (
                      <Container key={activity.id}>
                        <Row>
                          <Col md={1} style={{ maxWidth: '5%', textAlign: 'center' }}>
                            {(activity.type === 'SomethingWentWrong' ||
                              activity.type === 'PanicSold') && (
                              <IconContainer icon={faExclamationCircle} />
                            )}
                            {(activity.type === 'BuyFilled' || activity.type === 'SellFilled') && (
                              <IconContainer icon={faCheck} />
                            )}
                            {activity.type === 'StopLoss' && <IconContainer icon={faShieldAlt} />}
                            {activity.type === 'TrailingStarted' && <IconContainer icon={faFlag} />}
                            {activity.type === 'TradeCompleted' && (
                              <IconContainer icon={faUsdCircle} />
                            )}
                          </Col>
                          <Col md={11}>
                            {formatMessage(activity)}
                            <p style={{ marginTop: 8 }}>
                              <span style={{ opacity: 0.6 }}>
                                <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: 5 }} />
                                {moment(new Date(activity.time)).format('MMMM Do YYYY, hh:mm:ss ')}
                              </span>
                              {Number(key) < Number(this.props.unreadNotifications) && (
                                <NewBadge>New</NewBadge>
                              )}
                            </p>
                          </Col>
                        </Row>
                      </Container>
                    ))}
                    {totalPages !== 1 && (
                      <div style={{ marginTop: 10, marginBottom: 10 }}>
                        <Pagination
                          totalPages={totalPages}
                          currentPage={this.state.currentPage}
                          onChange={currentPage => this.setState({ currentPage })}
                        />
                      </div>
                    )}
                  </React.Fragment>
                ) : (
                  <EmptyPlaceholder title="No activities yet" />
                )}
              </React.Fragment>
            )}
          </TitleBox>
        </Row>
      </Grid>
    );
  }
}

Activity.propTypes = {
  actions: PropTypes.object.isRequired,
  userActivity: PropTypes.array,
  userActivityLoading: PropTypes.bool.isRequired,
  unreadNotifications: PropTypes.number.isRequired
};

Activity.defaultProps = {
  userActivity: []
};
