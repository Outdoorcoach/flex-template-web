import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { LINE_ITEM_HOURS_DISCOUNT, propTypes } from '../../util/types';
import config from '../../config';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';

import css from './BookingBreakdown.css';

const { Money } = sdkTypes;

const LineItemHoursDiscountMaybe = props => {
  const { transaction, participants, intl } = props;

  const hoursDiscountItem = transaction.attributes.lineItems.find(
    item => item.code === LINE_ITEM_HOURS_DISCOUNT && !item.reversal
  );

  if (!hoursDiscountItem) {
    return null;
  }
  const amount = new Money(hoursDiscountItem.lineTotal.amount * -1, config.currency);
  const formattedAmount = formatMoney(intl, amount);
  

  return (
    <div className={css.lineItem}>
      <span className={css.itemLabel}>
        <FormattedMessage id="BookingBreakdown.hoursDiscountText"/>
      </span>
      <span className={css.itemValue}>{formattedAmount}</span>
    </div>
  );
};

LineItemHoursDiscountMaybe.propTypes = {
  transaction: propTypes.transaction.isRequired,
};

export default LineItemHoursDiscountMaybe;
