import React from 'react';
import PropTypes from 'prop-types';

import { faTimesCircle } from '@fortawesome/pro-solid-svg-icons';

import { Body } from '@zendeskgarden/react-tables';
import { Title, Table, Row, Cell, Icon, DeleteButton } from './LayerStyles';

import { splitSymbol, add } from '../../../../../../utils/helpers';

function getTotal(layers) {
  let total = '';
  layers.forEach(layer => {
    total = add(total, layer.total);
  });
  return total;
}

function isMarketEnabled(layers) {
  let isEnabled = false;
  layers.forEach(layer => {
    if (layer.isMarketPrice) isEnabled = true;
  });
  return isEnabled;
}

const LayerBuyTable = props => (
  <Table>
    <Body>
      <Row>
        <Cell colSpan="3" style={{ background: '#f8f9f9' }}>
          <Title>{props.title}</Title>
        </Cell>
      </Row>

      <Row>
        <Cell style={{ width: 10 }} />
        <Cell>
          <Title>Price</Title>
        </Cell>
        <Cell style={{ textAlign: 'right', paddingRight: '40px' }}>
          <Title>Amount</Title>
        </Cell>
      </Row>
      {props.layers.length === 0 && (
        <Row>
          <Cell style={{ width: 10 }}>1.</Cell>
          <Cell>-</Cell>
          <Cell style={{ textAlign: 'right' }}>
            <span style={{ marginRight: 20 }}>-</span>
            <DeleteButton onClick={() => props.deleteLayer(1)}>
              <Icon icon={faTimesCircle} />
            </DeleteButton>
          </Cell>
        </Row>
      )}
      {Object.keys(props.layers).map(key => {
        const layer = props.layers[key];
        return (
          <Row key={key}>
            <Cell style={{ width: 10 }}>{Number(key) + 1}.</Cell>
            <Cell>{layer.isMarketPrice ? 'Market' : layer.buyPrice}</Cell>
            <Cell style={{ textAlign: 'right' }}>
              {layer.buyAmount}
              <DeleteButton onClick={() => props.deleteLayer(key)}>
                <Icon icon={faTimesCircle} />
              </DeleteButton>
            </Cell>
          </Row>
        );
      })}
      <Row>
        <Cell colSpan="2" style={{ background: '#f8f9f9' }}>
          <Title>Total:</Title>
        </Cell>
        <Cell style={{ background: '#f8f9f9', textAlign: 'right' }}>
          {props.layers.length === 0 ? (
            <Title>-</Title>
          ) : (
            <Title>
              {getTotal(props.layers)} {splitSymbol(props.symbolID, 2)}
            </Title>
          )}
        </Cell>
      </Row>
      {isMarketEnabled(props.layers) && (
        <Row style={{ borderTop: 'none' }}>
          <Cell colSpan="3" style={{ background: '#f8f9f9' }}>
            <Title style={{ fontSize: '11px' }}>
              Note:
              <span style={{ fontWeight: 400, marginLeft: 5 }}>
                Due to market order in one of the layers, make the total smaller than your real
                ballance. In case there is not enough funds for all of the layers, some layers might
                be smaller then you set due to lack of funds.
              </span>
            </Title>
          </Cell>
        </Row>
      )}
    </Body>
  </Table>
);

LayerBuyTable.propTypes = {
  title: PropTypes.string.isRequired,
  symbolID: PropTypes.string.isRequired,
  layers: PropTypes.array.isRequired,
  /* eslint react/no-unused-prop-types: 0 */
  deleteLayer: PropTypes.func.isRequired
};

export default LayerBuyTable;
