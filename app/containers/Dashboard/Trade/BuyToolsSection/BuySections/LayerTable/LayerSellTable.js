import React from 'react';
import PropTypes from 'prop-types';

import { faTimesCircle } from '@fortawesome/pro-solid-svg-icons';

import { Body } from '@zendeskgarden/react-tables';
import { Title, Table, Row, Cell, Icon, DeleteButton } from './LayerStyles';

import { add } from '../../../../../../utils/helpers';

function getTotal(layers) {
  let total = '';
  layers.forEach(layer => {
    total = add(total, layer.amountPercent);
  });
  return total;
}

const LayerSellTable = props => (
  <Table>
    <Body>
      <Row>
        <Cell colSpan="4" style={{ background: '#f8f9f9' }}>
          <Title>{props.title}</Title>
        </Cell>
      </Row>

      <Row>
        <Cell style={{ width: 10 }} />
        <Cell>
          <Title>Target price</Title>
        </Cell>
        <Cell>
          <Title>Amount</Title>
        </Cell>
        <Cell style={{ paddingRight: '40px' }}>
          <Title>Trailing</Title>
        </Cell>
      </Row>
      {props.layers.length === 0 && (
        <Row>
          <Cell style={{ width: 10 }}>1.</Cell>
          <Cell>-</Cell>
          <Cell>-</Cell>
          <Cell>
            <span>-</span>
            <DeleteButton
              onClick={() => props.deleteLayer(1)}
              style={{ float: 'right', marginTop: 3 }}
            >
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
            <Cell>{layer.sellPrice}</Cell>
            <Cell>{layer.amountPercent}%</Cell>
            <Cell>
              {layer.isTrailingEnabled ? `${Number(layer.trailingMarginPercent)}%` : 'Disabled'}
              <DeleteButton
                onClick={() => props.deleteLayer(key)}
                style={{ float: 'right', marginTop: 3 }}
              >
                <Icon icon={faTimesCircle} />
              </DeleteButton>
            </Cell>
          </Row>
        );
      })}
      <Row>
        <Cell colSpan="3" style={{ background: '#f8f9f9' }}>
          <Title>Total to sell:</Title>
        </Cell>
        <Cell style={{ background: '#f8f9f9', textAlign: 'right' }}>
          {props.layers.length === 0 ? <Title>-</Title> : <Title>{getTotal(props.layers)}%</Title>}
        </Cell>
      </Row>
    </Body>
  </Table>
);

LayerSellTable.propTypes = {
  title: PropTypes.string.isRequired,
  layers: PropTypes.array.isRequired,
  /* eslint react/no-unused-prop-types: 0 */
  deleteLayer: PropTypes.func.isRequired
};

export default LayerSellTable;
