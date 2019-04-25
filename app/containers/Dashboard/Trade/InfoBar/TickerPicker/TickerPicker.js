import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import { SelectContainer, Dropdown, SelectView, Item } from '@zendeskgarden/react-select';
import { TextField, Input } from '@zendeskgarden/react-textfields';

import { formatSymbol } from '../../../../../utils/helpers';

class TickerPicker extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    tickers: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    symbolID: PropTypes.string.isRequired,
    history: PropTypes.any.isRequired
  };
  state = {
    search: ''
  };
  handleChange = e => {
    const fieldName = e.target.name;
    this.setState({
      [fieldName]: e.target.value
    });
  };
  handleDropDown = selectedKey => {
    this.props.actions.setSymbolID(selectedKey);
    this.props.history.push(`/dashboard/trade/symbol/${selectedKey}`);
  };
  render() {
    return (
      <SelectContainer
        selectedKey={this.props.symbolID}
        onChange={selectedKey => this.handleDropDown(selectedKey)}
        trigger={({ getTriggerProps, triggerRef, isOpen }) => (
          <SelectView
            {...getTriggerProps({
              open: isOpen,
              focused: isOpen,
              className: 'tickerpicker',
              inputRef: ref => {
                this.triggerRef = ref;
                triggerRef(ref);
              }
            })}
          >
            {this.props.symbolID}
          </SelectView>
        )}
      >
        {({ getSelectProps, placement, getItemProps, focusedKey, dropdownRef }) => (
          <Dropdown
            {...getSelectProps({
              placement,
              animate: true,
              dropdownRef,
              style: {
                width: this.triggerRef.getBoundingClientRect().width
              }
            })}
          >
            <div
              style={{
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 10,
                paddingRight: 10
              }}
            >
              <TextField>
                <Input
                  name="search"
                  placeholder="Search for coin pair"
                  autocomplete="off"
                  onChange={this.handleChange}
                  value={this.state.search}
                />
              </TextField>
            </div>
            <div style={{ maxHeight: 200, overflow: 'auto' }}>
              {this.props.tickers.map(key => (
                <React.Fragment key={key}>
                  {key.indexOf(this.state.search.toUpperCase()) > -1 && (
                    <Item
                      {...getItemProps({
                        key,
                        textValue: key,
                        focused: focusedKey === key,
                        checked: this.props.symbolID === key
                      })}
                    >
                      {formatSymbol(key)}
                    </Item>
                  )}
                </React.Fragment>
              ))}
            </div>
          </Dropdown>
        )}
      </SelectContainer>
    );
  }
}

export default withRouter(TickerPicker);
